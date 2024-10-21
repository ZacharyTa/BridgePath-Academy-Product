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
    <div className="mb-8 flex items-center justify-between">
      <div>
        <Button variant="outline" size="sm" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Skill Path
        </Button>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-400 text-sm">{details}</p>
      </div>
      <div className="w-1/3">
        <Progress value={progress} className="w-full" />
        <p className="mt-1 text-right text-sm">
          {Math.round(progress)}% Complete
        </p>
      </div>
    </div>
  );
}
