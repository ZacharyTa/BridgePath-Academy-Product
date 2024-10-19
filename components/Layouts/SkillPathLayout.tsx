import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  Award,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  progress: number;
}

interface SkillPathProps {
  title?: string;
  description?: string;
  totalCourses?: number;
  estimatedTime?: string;
  skillLevel?: string;
  includesCertification?: boolean;
  includesCapstone?: boolean;
  courses?: Course[];
  overallProgress?: number;
}

export default function SkillPathPage({
  title = "Digital Marketing w/ Zapier",
  description = "Master digital marketing strategies and automate your workflows with Zapier.",
  totalCourses = 5,
  estimatedTime = "20 hours",
  skillLevel = "Intermediate",
  includesCertification = true,
  includesCapstone = true,
  courses = [
    {
      id: 1,
      title: "Introduction to Digital Marketing",
      description: "Learn the basics of digital marketing strategies.",
      duration: "3 hours",
      completed: true,
      progress: 100,
    },
    {
      id: 2,
      title: "Social Media Marketing",
      description: "Master social media platforms for business growth.",
      duration: "4 hours",
      completed: true,
      progress: 100,
    },
    {
      id: 3,
      title: "Email Marketing Automation",
      description: "Automate your email marketing campaigns.",
      duration: "5 hours",
      completed: false,
      progress: 60,
    },
    {
      id: 4,
      title: "Zapier Fundamentals",
      description: "Learn how to automate workflows with Zapier.",
      duration: "4 hours",
      completed: false,
      progress: 0,
    },
    {
      id: 5,
      title: "Advanced Marketing Automation",
      description: "Combine marketing strategies with Zapier automation.",
      duration: "4 hours",
      completed: false,
      progress: 0,
    },
  ],
  overallProgress = 52,
}: SkillPathProps) {
  return (
    <div className="container mx-auto max-w-6xl bg-white px-4 py-8 dark:bg-boxdark">
      <div className="mb-8">
        <Progress value={overallProgress} className="h-4 w-full" />
        <p className="mt-2 text-center text-sm font-medium">
          {overallProgress}% Completed
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="mb-4 text-4xl font-bold dark:text-white">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            {description}
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
              <BookOpen className="mr-2 h-5 w-5 text-primary dark:text-white" />
              <span className="text-base font-semibold dark:text-white">
                {totalCourses} Courses
              </span>
            </div>
            <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
              <Clock className="mr-2 h-5 w-5 text-primary dark:text-white" />
              <span className="text-base font-semibold dark:text-white">
                {estimatedTime}
              </span>
            </div>
            <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
              <Briefcase className="mr-2 h-5 w-5 text-primary dark:text-white" />
              <span className="text-base font-semibold dark:text-white">
                {skillLevel}
              </span>
            </div>
            {includesCertification && (
              <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
                <Award className="mr-2 h-5 w-5 text-primary dark:text-white" />
                <span className="text-base font-semibold dark:text-white">
                  Certification
                </span>
              </div>
            )}
          </div>

          <h2 className="mb-4 text-2xl font-semibold dark:text-white">
            Course Plan
          </h2>
          <div className="space-y-4">
            {courses.map((course, index) => (
              <Card
                key={course.id}
                className="transition-shadow hover:shadow-lg dark:border-strokedark dark:bg-white"
              >
                <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
                  <CardTitle className="text-lg font-semibold dark:text-white">
                    {index + 1}. {course.title}
                  </CardTitle>
                  <div className="flex items-center">
                    <Clock className="text-gray-500 dark:text-gray-300 mr-1 h-4 w-4" />
                    <span className="text-gray-500 dark:text-gray-300 text-sm">
                      {course.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6 dark:bg-boxdark-2">
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Progress value={course.progress} className="w-2/3" />
                    <span className="text-sm font-medium dark:text-white">
                      {course.progress}%
                    </span>
                    {course.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                    ) : (
                      <Button
                        size="sm"
                        className="hover:bg-primary-dark dark:hover:bg-primary-dark ml-2 bg-primary px-6 text-white transition-all duration-300 hover:shadow-md"
                      >
                        Continue <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="dark:border-strokedark dark:bg-boxdark-2">
            <CardHeader className="p-4">
              <CardTitle className="dark:text-white">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 font-semibold dark:text-white">
                    Current Course
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {courses.find((course) => !course.completed)?.title}
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold dark:text-white">
                    Next Up
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {courses[
                      courses.findIndex((course) => !course.completed) + 1
                    ]?.title || "Complete!"}
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold dark:text-white">
                    Estimated Time Remaining
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {courses.reduce(
                      (acc, course) =>
                        acc +
                        (course.completed ? 0 : parseInt(course.duration)),
                      0,
                    )}{" "}
                    hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
