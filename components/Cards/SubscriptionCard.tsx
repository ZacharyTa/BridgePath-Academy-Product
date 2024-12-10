"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getSubscription,
  setSubscription,
  clearCookies,
} from "@/helper/useCookies";
import { useRouter } from "next/navigation";

const SubscriptionCard = () => {
  const [subscription, setSubscriptionState] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const currentSubscription = getSubscription();
    setSubscriptionState(currentSubscription);

    if (currentSubscription) {
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      setEndDate(endDate.toDateString());
    }
  }, []);

  const handleModifySubscription = () => {
    // Logic to modify subscription
    router.push("/subscription?callback=profile");
  };

  const handleCancelSubscription = () => {
    clearCookies();
    setSubscriptionState(null);
    setEndDate("");
    console.log("Subscription cancelled");
  };

  return (
    <div className="bg- mx-auto mt-10 max-w-md rounded-lg p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Current Subscription</h2>
      {subscription ? (
        <>
          <p className="mb-2 text-lg font-bold">
            Plan: <span className="text-success">{subscription}</span>
          </p>
          <p className="mb-4 text-lg">Ends on: {endDate}</p>
          <Button
            className="mr-4 text-white"
            onClick={handleModifySubscription}
          >
            Modify Subscription
          </Button>
          <Button
            variant="destructive"
            className="bg-error text-white"
            onClick={handleCancelSubscription}
          >
            Cancel Subscription
          </Button>
        </>
      ) : (
        <p className="text-lg">You do not have an active subscription.</p>
      )}
    </div>
  );
};

export default SubscriptionCard;
