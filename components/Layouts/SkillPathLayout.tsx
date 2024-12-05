"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import skillPaths from "@/skillPaths";
import {
  getSkillPathId,
  setCourseId,
  getCompletedLessons,
} from "@/helper/useCookies";

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

export default function SkillPathPage() {
  const router = useRouter();
  const [skillPath, setSkillPath] = useState<SkillPathProps | null>(null);

  useEffect(() => {
    const skillPathId = getSkillPathId();

    if (skillPathId) {
      const foundSkillPath = skillPaths.find((path) => path.id === skillPathId);

      if (foundSkillPath) {
        const totalCourses = foundSkillPath.courses.length;
        const estimatedTime = `${foundSkillPath.duration} hours`;
        const skillLevel = foundSkillPath.difficulty_level;
        const includesCertification = true;
        const includesCapstone = true;

        // Calculate overall progress based on saved completed lessons
        const totalLessons = foundSkillPath.courses.reduce(
          (acc, course) => acc + course.lessons.length,
          0,
        );

        const completedLessonIds = getCompletedLessons(skillPathId) || [];
        const totalCompletedLessons = completedLessonIds.length;

        const overallProgress = (totalCompletedLessons / totalLessons) * 100;

        setSkillPath({
          title: foundSkillPath.title,
          description: foundSkillPath.description,
          totalCourses,
          estimatedTime,
          skillLevel,
          includesCertification,
          includesCapstone,
          overallProgress,
          courses: foundSkillPath.courses.map((course) => {
            const courseCompletedLessons = course.lessons.filter((lesson) =>
              completedLessonIds.includes(lesson.id),
            );

            const courseProgress =
              (courseCompletedLessons.length / course.lessons.length) * 100;

            return {
              id: course.id,
              title: course.title,
              description: course.description || "",
              duration: `${course.lessons.reduce(
                (acc, lesson) =>
                  acc + parseInt(lesson.video.url.split("=").pop() || "0", 10),
                0,
              )} hours`,
              progress: courseProgress,
              completed: courseProgress === 100,
            };
          }),
        });
      } else {
        // Handle case when skillPathId is not set
        router.push("/course-library");
      }
    }
  }, []);

  if (!skillPath) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl bg-white px-4 py-8 dark:bg-boxdark">
      <div className="mb-8">
        <Progress value={skillPath.overallProgress} className="h-4 w-full" />
        <p className="mt-2 text-center text-sm font-medium">
          {Math.round(skillPath.overallProgress)}% Completed
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="mb-4 text-4xl font-bold dark:text-white">
            {skillPath.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            {skillPath.description}
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
              <BookOpen className="mr-2 h-5 w-5 text-primary dark:text-white" />
              <span className="text-base font-semibold dark:text-white">
                {skillPath.totalCourses} Courses
              </span>
            </div>
            <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
              <Clock className="mr-2 h-5 w-5 text-primary dark:text-white" />
              <span className="text-base font-semibold dark:text-white">
                {skillPath.estimatedTime}
              </span>
            </div>
            <div className="flex items-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900 dark:to-purple-900">
              <Briefcase className="mr-2 h-5 w-5 text-primary dark:text-white" />
              <span className="text-base font-semibold dark:text-white">
                {skillPath.skillLevel}
              </span>
            </div>
            {skillPath.includesCertification && (
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
            {skillPath.courses.map((course, index) => (
              <Card
                key={course.id}
                className="cursor-pointer transition-transform duration-100 hover:translate-x-5 hover:shadow-lg dark:border-strokedark dark:bg-white"
                onClick={() => {
                  setCourseId(course.id);
                  router.push("/recommended-learning-path");
                }}
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
                    {
                      skillPath.courses.find((course) => !course.completed)
                        ?.title
                    }
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold dark:text-white">
                    Next Up
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {skillPath.courses[
                      skillPath.courses.findIndex(
                        (course) => !course.completed,
                      ) + 1
                    ]?.title || "Complete!"}
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold dark:text-white">
                    Estimated Time Remaining
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {skillPath.courses.reduce(
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
