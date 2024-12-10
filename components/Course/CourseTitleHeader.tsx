"use client";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSkillPathId } from "@/helper/useCookies";

interface CourseTitleHeaderProps {
  title: string;
  progress: number;
  details: string;
}

export default function CourseTitleHeader({
  title,
  progress,
  details,
}: CourseTitleHeaderProps) {
  const router = useRouter();

  console.log("CourseTitleHeaderProps", title, progress, details);

  const handleBackClick = () => {
    const skillPathId = getSkillPathId();
    if (skillPathId) {
      router.push("/progress-overview");
    } else {
      router.push("/course-library");
    }
  };

  return (
    <div className="mb-8">
      {/* Breadcrumb Button */}
      <div className="flex w-full items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-600 dark:text-gray-300 mb-2"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Skill Path
        </Button>
      </div>

      {/* Course Title and Details */}
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col items-start">
          <h1 className="text-5xl font-extrabold dark:text-white">{title}</h1>
          <div className="mb-8 mt-8 flex w-full flex-col items-start">
            <Progress value={progress} className="h-4 w-full" />
            <p className="text-md mt-2 text-right font-normal dark:text-body">
              {Math.round(progress)}% Complete
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-xl">{details}</p>
        </div>

        {/* Progress Bar */}
      </div>

      {/* Visual Divider */}
      <hr className="border-gray-300 dark:border-gray-700 mt-4" />
    </div>
  );
}
