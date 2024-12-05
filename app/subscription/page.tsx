"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { setSubscription } from "@/helper/useCookies";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["1 user", "Basic features", "1GB storage", "Email support"],
    button: "Try for Free",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "$9.99",
    description: "Great for small teams",
    features: [
      "5 users",
      "Basic Courses",
      "10GB storage",
      "Priority email support",
      "API access",
    ],
    button: "Get Basic",
    highlighted: true,
  },
  {
    name: "Advanced",
    price: "$29.99",
    description: "For larger organizations",
    features: [
      "Unlimited users",
      "Premium features",
      "100GB storage",
      "24/7 phone support",
      "Advanced API access",
      "Custom integrations",
    ],
    button: "Get Advanced",
    highlighted: false,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="text-foreground mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Choose the right plan for you
          </p>
        </div>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-lg leading-8">
          Tech is dominating the job market. Stay ahead.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.name}
              className={`bg-card ring-muted-foreground/10 flex flex-col justify-between rounded-3xl p-8 ring-1 xl:p-10 ${
                tier.highlighted
                  ? "lg:z-10 lg:rounded-b-none"
                  : tierIdx === 0
                    ? "lg:rounded-r-none"
                    : "lg:rounded-l-none"
              } ${tier.highlighted ? "lg:shadow-lg" : ""}`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    className={`text-lg font-semibold leading-8 ${tier.highlighted ? "text-primary" : "text-foreground"}`}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-6">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-foreground text-4xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground text-sm font-semibold leading-6">
                    /month
                  </span>
                </p>
                <ul
                  role="list"
                  className="text-muted-foreground mt-8 space-y-3 text-sm leading-6"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={`mt-8 ${tier.highlighted ? "bg-primary text-white hover:bg-primary/90" : "text-white"}`}
                onClick={() => setSubscription(tier.name)}
              >
                {tier.button}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
