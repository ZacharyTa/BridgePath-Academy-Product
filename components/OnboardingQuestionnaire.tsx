"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function OnboardingQuestionnaire() {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
  };

  if (isCompleted) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-boxdark">
      <h2 className="mb-4 text-2xl font-semibold dark:text-white">
        Onboarding Questionnaire
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="dark:text-white">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              required
              className="dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <Label className="dark:text-white">Your Experience Level</Label>
            <RadioGroup defaultValue="beginner">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="beginner"
                  id="beginner"
                  className="dark:bg-gray-800 dark:text-white"
                />
                <Label htmlFor="beginner" className="dark:text-white">
                  Beginner
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="intermediate"
                  id="intermediate"
                  className="dark:bg-gray-800 dark:text-white"
                />
                <Label htmlFor="intermediate" className="dark:text-white">
                  Intermediate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="advanced"
                  id="advanced"
                  className="dark:bg-gray-800 dark:text-white"
                />
                <Label htmlFor="advanced" className="dark:text-white">
                  Advanced
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="dark:bg-gray-800 dark:text-white">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
