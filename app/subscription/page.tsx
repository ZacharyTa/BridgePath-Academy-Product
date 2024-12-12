"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { setSubscription } from "@/helper/useCookies";
import { useRouter, useSearchParams } from "next/navigation";

const tiers = [
  // Subscription tiers for learners
  {
    name: "Free",
    category: "jobSeekers",
    prices: {
      monthly: "$0",
      yearly: "$0",
    },
    description: "Begin learning essential tools",
    features: ["1 user", "Access to free courses", "No certification"],
    button: "Start for Free",
    highlighted: false,
    pricingType: "subscription",
  },
  {
    name: "Basic",
    category: "jobSeekers",
    prices: {
      monthly: "$14.99",
      yearly: "$149.99",
    },
    description: "Gain Intermediate skills and certifications",
    features: [
      "1 user",
      "Access to Basic courses",
      "Earn Certifications",
      "Capstone projects",
    ],
    button: "Get Basic",
    highlighted: true,
    pricingType: "subscription",
  },
  {
    name: "Advanced",
    category: "jobSeekers",
    prices: {
      monthly: "$24.99",
      yearly: "$249.99",
    },
    description: "Specialize in advanced tools and projects",
    features: [
      "1 user",
      "Access to all advanced courses",
      "Capstone projects",
      "Earn Certifications",
    ],
    button: "Go Pro",
    highlighted: false,
    pricingType: "subscription",
  },
  // Certification options
  {
    name: "Single Certification",
    category: "certificates",
    prices: {
      oneTime: "$49.99",
    },
    description: "Certification for one tool",
    features: ["One niche tool certification"],
    button: "Get Certified",
    highlighted: false,
    pricingType: "oneTime",
  },
  {
    name: "Certification Bundle",
    category: "certificates",
    prices: {
      oneTime: "$119.99",
    },
    description: "Bundle certifications for related tools",
    features: ["Multiple certifications in one bundle"],
    button: "Get Bundle",
    highlighted: false,
    pricingType: "oneTime",
  },
  // B2B options
  {
    name: "Team Training",
    category: "businesses",
    prices: {
      oneTime: "$499.99",
    },
    description: "Upskill your team with curated training",
    features: [
      "Team-based access",
      "Customizable learning paths",
      "Progress tracking",
    ],
    button: "Train Your Team",
    highlighted: false,
    pricingType: "oneTime",
  },
  {
    name: "Enterprise Solutions",
    category: "businesses",
    prices: {
      custom: "Contact us",
    },
    description: "Custom solutions for large organizations",
    features: [
      "Tailored training programs",
      "Advanced analytics",
      "Dedicated support",
    ],
    button: "Contact Us",
    highlighted: false,
    pricingType: "custom",
  },
];

type Category = "jobSeekers" | "businesses" | "certificates";

const categories = [
  { id: "jobSeekers", label: "For Learners" },
  { id: "businesses", label: "For Teams" },
  { id: "certificates", label: "For Certifications" },
];

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [activeCategory, setActiveCategory] = useState<Category>("jobSeekers");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");

  const filteredTiers = tiers.filter(
    (tier) => tier.category === activeCategory,
  );

  const handleSetSubscription = (tierName: string) => {
    setSubscription(tierName);
    if (callback) {
      router.push(callback as string);
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="text-foreground mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Choose Your Path to Success
          </p>
        </div>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-lg leading-8">
          Learn the tools that matter and boost your career or business.
        </p>

        {/* Category Tabs */}
        <div className="mt-16 flex justify-center">
          <div className="border-gray-200 inline-flex rounded-lg border p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveCategory(category.id as Category)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Billing cycle toggle - only show for jobSeekers */}
        {activeCategory === "jobSeekers" && (
          <div className="mt-8 flex justify-center">
            <div className="bg-muted flex items-center rounded-full bg-base-300 p-1">
              <button
                className={`rounded-full px-4 py-2 ${
                  billingCycle === "monthly"
                    ? "bg-primary text-white"
                    : "text-foreground"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly Billing
              </button>
              <button
                className={`rounded-full px-4 py-2 ${
                  billingCycle === "yearly"
                    ? "bg-primary text-white"
                    : "text-foreground"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly Billing
              </button>
            </div>
          </div>
        )}

        {/* Pricing grid */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {filteredTiers.map((tier, tierIdx) => (
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
                    className={`text-lg font-semibold leading-8 ${
                      tier.highlighted ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-6">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-foreground text-4xl font-bold tracking-tight">
                    {tier.pricingType === "subscription"
                      ? tier.prices[billingCycle]
                      : tier.prices.oneTime || tier.prices.custom}
                  </span>
                  {tier.pricingType === "subscription" && (
                    <span className="text-muted-foreground text-sm font-semibold leading-6">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  )}
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
                className={`mt-8 ${
                  tier.highlighted
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "text-white"
                }`}
                onClick={() => handleSetSubscription(tier.name)}
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
