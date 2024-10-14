import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { SupabaseClient } from "@supabase/supabase-js";
import configFile from "@/config";
import { findCheckoutSession } from "@/libs/stripe";

export const runtime = "edge";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
  typescript: true,
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// This is where we receive Stripe webhook events
// It used to update the user data, send emails, etc...
// By default, it'll store the user in the database
// See more: https://shipfa.st/docs/features/payments
// Helper to retrieve raw body for webhook verification
async function buffer(readable: ReadableStream): Promise<Buffer> {
  const reader = readable.getReader();
  const chunks = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = readerDone;
  }

  return Buffer.concat(chunks);
}

// This is where we receive Stripe webhook events
export async function POST(req: NextRequest) {
  const signature = headers().get("stripe-signature");
  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing webhook signature or secret" },
      { status: 400 },
    );
  }

  // Retrieve the raw body from the request
  const body = await buffer(req.body);

  let event: Stripe.Event;
  let eventType: string;

  // Create a private Supabase client using the secret service_role API key
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  // verify Stripe event is legit
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
    );
    eventType = event.type;
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        const stripeObject: Stripe.Checkout.Session = event.data
          .object as Stripe.Checkout.Session;

        const session = await findCheckoutSession(stripeObject.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = stripeObject.client_reference_id;
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

        if (!plan) break;

        // Update the profile where id equals the userId (in table called 'profiles') and update the customer_id, price_id, and has_access (provisioning)
        await supabase
          .from("profiles")
          .update({
            customer_id: customerId,
            price_id: priceId,
            has_access: true,
          })
          .eq("id", userId);

        // Extra: send email with user link, product page, etc...
        // try {
        //   await sendEmail(...);
        // } catch (e) {
        //   console.error("Email issue:" + e?.message);
        // }

        break;
      }

      case "checkout.session.expired": {
        // User didn't complete the transaction
        // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
        break;
      }

      case "customer.subscription.updated": {
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
        // You can update the user data to show a "Cancel soon" badge for instance
        const { data, error } = await supabase.auth.refreshSession();
        console.log("data: customer.subscription.updated", data);
        if (error) throw error;

        break;
      }

      case "customer.subscription.paused": {
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
        // You can update the user data to show a "Cancel soon" badge for instance

        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;
        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id,
        );

        await supabase
          .from("profiles")
          .update({ has_access: true })
          .eq("customer_id", subscription.customer);

        // const { data, error } = await supabase.auth.refreshSession()
        // console.log("data: customer.subscription.paused", data)
        // if (error) throw error

        break;
      }

      case "customer.subscription.deleted": {
        // The customer subscription stopped
        // ❌ Revoke access to the product
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;
        console.log("customer.subscription.deleted", stripeObject);
        // const customer = stripeObject.customer;
        const customerId =
          typeof stripeObject.customer === "string"
            ? stripeObject.customer
            : stripeObject.customer.id;
        // const customer = await stripe.customers.retrieve(customerId);
        // console.log("customer", customer);
        console.log("customerId", customerId);

        await supabase
          .from("profiles")
          .update({ has_access: false })
          .eq("customer_id", customerId);

        // const { data, error } = await supabase.auth.refreshSession()
        // console.log("data: customer.subscription.deleted", data)
        // if (error) throw error
        await supabase.auth.refreshSession();

        break;
      }

      case "invoice.paid": {
        // Customer just paid an invoice (for instance, a recurring payment for a subscription)
        // ✅ Grant access to the product
        const stripeObject: Stripe.Invoice = event.data
          .object as Stripe.Invoice;
        console.log("invoice.paid", stripeObject);
        const priceId = stripeObject.lines.data[0].price.id;
        const customer_email = stripeObject.customer_email.toLowerCase();

        // Find profile where customer_id equals the customerId (in table called 'profiles')
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", customer_email)
          .single();

        console.log("profile", profile);
        console.log("priceId", priceId);
        console.log("email", customer_email);

        if (error) {
          console.error("Error fetching profile:", error);
          break; // Handle the error appropriately
        }

        if (!profile) {
          console.error("Profile not found for email:", customer_email);
          break; // Exit early if the profile is not found
        }

        // Make sure the invoice is for the same plan (priceId) the user subscribed to
        if (profile.price_id !== priceId) break;

        // Grant the profile access to your product. It's a boolean in the database, but could be a number of credits, etc...
        await supabase
          .from("profiles")
          .update({ has_access: true })
          .eq("email", customer_email);

        break;
      }

      case "invoice.payment_failed":
        // A payment failed (for instance the customer does not have a valid payment method)
        // ❌ Revoke access to the product
        // ⏳ OR wait for the customer to pay (more friendly):
        //      - Stripe will automatically email the customer (Smart Retries)
        //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired

        break;

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: ", e.message);
  }

  return NextResponse.json({});
}

// Bug: Stripe webhook events are being received, but the user's profile is not being updated because the user's customer id does not match the customer id in the Stripe webhook event.
// To fix: Use customer's email instead
