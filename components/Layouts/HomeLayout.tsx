import React from "react";
import { CourseLibrary } from "@/components/CourseLibrary";
import { RecommendedLearningPath } from "@/components/RecommendedLearningPath";
import { ProgressOverview } from "@/components/ProgressOverview";
import { OnboardingQuestionnaire } from "@/components/OnboardingQuestionnaire";

export default function DashboardContainer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Educational Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <OnboardingQuestionnaire />
        </div>
        <div className="lg:col-span-2">
          <RecommendedLearningPath />
        </div>
        <div>
          <ProgressOverview />
        </div>
        <div className="lg:col-span-3">
          <CourseLibrary />
        </div>
      </div>
    </div>
  );
}
