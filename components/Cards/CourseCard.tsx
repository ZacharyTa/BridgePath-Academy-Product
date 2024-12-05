"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  Award,
  Laptop,
  CheckSquare,
  BarChart,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  setCourseId,
  setUserLessonId,
  setSkillPathId,
  getSubscription,
} from "@/helper/useCookies";

interface CourseCardProps {
  id: number;
  requiredSubscriptionLevel?: "Free" | "Basic" | "Advanced";
  label?: "Skill Path" | "Free Course";
  title?: string;
  description?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  courseCount?: number;
  jobCategory?: string;
  includesCertificate?: boolean;
  includesProject?: boolean;
}

export default function CourseCard({
  id,
  label = "Skill Path",
  requiredSubscriptionLevel = "Free",
  title = "Web Development",
  description = "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
  difficulty = "Beginner",
  duration = "40 Hours",
  courseCount = 9,
  jobCategory = "Technology",
  includesCertificate = true,
  includesProject = true,
}: CourseCardProps) {
  const router = useRouter();
  const userSubscription = (getSubscription() || "Free") as
    | "Free"
    | "Basic"
    | "Advanced";
  const subscriptionLevels = {
    Free: 0,
    Basic: 1,
    Advanced: 2,
  };
  const hasAccess =
    subscriptionLevels[userSubscription] >=
    subscriptionLevels[requiredSubscriptionLevel];

  const difficultyPercentage = {
    Beginner: "33%",
    Intermediate: "66%",
    Advanced: "100%",
  };

  const handleClick = () => {
    if (hasAccess) {
      setSkillPathId(id);
      setUserLessonId(0);
      setCourseId(0);
      router.push("/progress-overview");
    } else {
      router.push("/subscription");
    }
  };

  return (
    <Card className="relative w-full max-w-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:border-strokedark dark:bg-boxdark">
      {!hasAccess && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-25 dark:bg-opacity-50">
          <Lock className="h-12 w-12 text-white" />
          <button
            className="btn btn-md mt-4 transform bg-secondary text-white duration-100 hover:scale-105 hover:bg-whiten hover:text-black hover:shadow-lg hover:shadow-meta-6"
            onClick={() => router.push("/subscription")}
          >
            Upgrade
          </button>
        </div>
      )}
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900">
          <div className="dark:bg-gray-800 absolute left-4 top-4 rounded-md border border-primary/20 bg-white px-3 py-1.5 text-sm font-bold text-primary shadow-md">
            {label}
          </div>
          <div
            className={`absolute right-4 top-4 rounded-md border px-3 py-1.5 text-sm font-bold shadow-md ${
              requiredSubscriptionLevel === "Free"
                ? "dark:bg-gray-800 border-primary/20 bg-white text-primary"
                : requiredSubscriptionLevel === "Basic"
                  ? "shadow-[0 0 10px rgba(255, 215, 0, 0.5)] border-none bg-base-100 text-[#FFD700]"
                  : "shadow-0 0 10px rgba(255, 215, 0, 0.5) border-none bg-[#FFD700] text-purple-500 shadow-lg"
            }`}
          >
            {requiredSubscriptionLevel}
          </div>
        </div>
      </CardHeader>
      <CardContent className="bg-white p-6 dark:bg-boxdark">
        <CardTitle className="text-gray-800 mb-3 text-3xl font-extrabold dark:text-white">
          {title}
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
          {description}
        </p>
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div className="col-span-2 flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
            <BookOpen className="mr-3 h-7 w-7 text-primary dark:text-white" />
            <span className="text-base font-semibold dark:text-white">
              {courseCount} Courses
            </span>
          </div>
          <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
            {includesCertificate && (
              <>
                <Award className="mr-3 h-7 w-7 text-primary dark:text-white" />
                <span className="font-medium dark:text-white">Certificate</span>
              </>
            )}
          </div>
          <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
            {includesProject && (
              <>
                <CheckSquare className="mr-3 h-7 w-7 text-primary dark:text-white" />
                <span className="font-medium dark:text-white">Project</span>
              </>
            )}
          </div>
        </div>
        <div className="mb-6 flex items-start justify-between rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 p-4 dark:from-blue-800 dark:to-purple-800">
          <div className="flex items-start">
            <BarChart className="mr-3 mt-1 h-7 w-7 text-primary dark:text-white" />
            <div>
              <span className="text-base font-semibold dark:text-white">
                {difficulty}
              </span>
              <div className="bg-gray-300 dark:bg-gray-700 mt-2 h-2 w-24 rounded-full">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out dark:bg-white"
                  style={{ width: difficultyPercentage[difficulty] }}
                ></div>
              </div>
              <span className="text-gray-500 dark:text-gray-400 mt-2 block text-xs">
                Course Difficulty
              </span>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="mr-3 mt-1 h-7 w-7 text-primary dark:text-white" />
            <div>
              <span className="text-base font-semibold dark:text-white">
                {duration}
              </span>
              <span className="text-gray-500 dark:text-gray-400 mt-2 block text-xs">
                Course Duration
              </span>
            </div>
          </div>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <div className="text-gray-500 dark:text-gray-400 flex items-center text-sm">
            <Laptop className="mr-2 h-5 w-5 text-primary dark:text-white" />
            <span>{jobCategory}</span>
          </div>
          <Button
            className="hover:bg-primary-dark dark:hover:bg-primary-dark h-10 bg-primary px-6 text-white transition-all duration-300 hover:shadow-md"
            onClick={handleClick}
          >
            {hasAccess ? "Start Learning" : "Upgrade"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
