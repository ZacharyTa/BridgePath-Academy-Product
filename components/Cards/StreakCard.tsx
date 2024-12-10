"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

export default function StreakCard() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Simulating fetching the streak from an API or local storage
    // In a real application, you would replace this with actual data fetching
    const fetchStreak = () => {
      // For demo purposes, we'll use a random number between 1 and 30
      const randomStreak = Math.floor(Math.random() * 30) + 1;
      setStreak(randomStreak);
    };

    fetchStreak();
  }, []);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Learning Streak</CardTitle>
        <Flame className="h-8 w-8 animate-pulse text-orange-400" />
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="mb-2 text-5xl font-extrabold text-success">
            {streak} days
          </p>
          <p className="text-muted-foreground">
            {streak === 1
              ? "You've started your learning journey! Keep it up!"
              : `Wow! You've been learning for ${streak} consecutive days!`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
