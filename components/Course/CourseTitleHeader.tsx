import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
  return (
    <div className="mb-8">
      {/* Breadcrumb Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-600 dark:text-gray-300 mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Skill Path
        </Button>
      </div>

      {/* Course Title and Details */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-extrabold dark:text-white">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl">{details}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-1/3">
          <Progress value={progress} className="h-4 w-full" />
          <p className="mt-2 text-right text-lg font-medium">
            {Math.round(progress)}% Complete
          </p>
        </div>
      </div>

      {/* Visual Divider */}
      <hr className="border-gray-300 dark:border-gray-700 mt-4" />
    </div>
  );
}
