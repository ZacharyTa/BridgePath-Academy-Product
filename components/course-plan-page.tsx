"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

import CourseTitleHeader from "@/components/Course/CourseTitleHeader";
import VideoPlayer from "@/components/Course/VideoPlayer";
import QuizContainer from "@/components/Course/QuizContainer";
import { Course, Lesson } from "@/libs/types";
import { setUserLessonId, getUserLessonId } from "@/helper/useCookies";

interface CoursePlanPageComponentProps {
  lessons: Lesson[];
  currentLessonIndexParam: number;
  onSelectLesson: (index: number) => void;
}

export const CoursePlanPageComponent: React.FC<
  CoursePlanPageComponentProps
> = ({ lessons, currentLessonIndexParam, onSelectLesson }) => {
  const [currentCourse, setCurrentCourse] = useState<Course>({
    id: lessons[currentLessonIndexParam].id,
    title: lessons[currentLessonIndexParam].video.title,
    lessons: lessons,
    progress: 0,
  });
  const [currentLessonIndex, setCurrentLessonIndex] = useState(
    currentLessonIndexParam,
  );

  useEffect(() => {
    // Get lesson ID from cookies
    const lessonId = getUserLessonId();
    if (lessonId) {
      const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
      if (lessonIndex !== -1) {
        setCurrentLessonIndex(lessonIndex);
        onSelectLesson(lessonIndex);
        setCurrentCourse((prevCourse) => ({
          ...prevCourse,
          id: lessons[lessonIndex].id,
          title: lessons[lessonIndex].video.title,
        }));
      }
    } else {
      // If no lesson ID in cookies, use the default
      setCurrentLessonIndex(currentLessonIndexParam);
    }
  }, [lessons, currentLessonIndexParam, onSelectLesson]);

  const handleLessonComplete = () => {
    const updatedLessons = [...currentCourse.lessons];
    updatedLessons[currentLessonIndex].completed = true;
    const progress =
      (updatedLessons.filter((lesson) => lesson.completed).length /
        updatedLessons.length) *
      100;
    setCurrentCourse({ ...currentCourse, lessons: updatedLessons, progress });
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < currentCourse.lessons.length - 1) {
      const nextLessonIndex = currentLessonIndex + 1;
      setUserLessonId(currentCourse.lessons[nextLessonIndex].id);
      setCurrentLessonIndex(nextLessonIndex);
      onSelectLesson(nextLessonIndex);
      setCurrentCourse({
        ...currentCourse,
        id: currentCourse.lessons[nextLessonIndex].id,
        title: currentCourse.lessons[nextLessonIndex].video.title,
      });
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLessonIndex = currentLessonIndex - 1;
      setUserLessonId(currentCourse.lessons[prevLessonIndex].id);
      setCurrentLessonIndex(prevLessonIndex);
      onSelectLesson(prevLessonIndex);
      setCurrentCourse({
        ...currentCourse,
        id: currentCourse.lessons[prevLessonIndex].id,
        title: currentCourse.lessons[prevLessonIndex].video.title,
      });
    }
  };

  if (!currentCourse) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto bg-white px-4 py-8 dark:bg-boxdark dark:text-bodydark">
      <CourseTitleHeader
        title={currentCourse.title}
        progress={currentCourse.progress}
        details={`${currentLessonIndex + 1}/${currentCourse.lessons.length} lessons completed`}
      />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-3">
          <Card className="dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark">
            <CardContent className="p-6">
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="dark:bg-boxdark dark:text-bodydark">
                  <TabsTrigger value="video" className="dark:text-bodydark">
                    <span className="flex items-center">
                      <ArrowRight className="mr-1 h-4 w-4" /> Video
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="dark:text-bodydark">
                    <span className="flex items-center">
                      <ArrowRight className="mr-1 h-4 w-4" /> Resources
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="dark:text-bodydark">
                    <span className="flex items-center">
                      <ArrowRight className="mr-1 h-4 w-4" /> Notes
                    </span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="video"
                  className="dark:bg-boxdark dark:text-bodydark"
                >
                  <VideoPlayer
                    videoUrl={
                      currentCourse.lessons[currentLessonIndex].video.url
                    }
                    onComplete={handleLessonComplete}
                  />
                </TabsContent>
                <TabsContent
                  value="resources"
                  className="dark:bg-boxdark dark:text-bodydark"
                >
                  <p>Additional resources for this lesson...</p>
                </TabsContent>
                <TabsContent
                  value="notes"
                  className="dark:bg-boxdark dark:text-bodydark"
                >
                  <textarea
                    className="dark:bg-gray-800 h-40 w-full rounded border p-2 dark:text-white"
                    placeholder="Take notes here..."
                  ></textarea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-8 dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark">
            <QuizContainer
              quizzes={currentCourse.lessons[currentLessonIndex].video.quiz}
              lessonId={currentCourse.lessons[currentLessonIndex].id}
              onComplete={handleLessonComplete}
            />
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          onClick={handlePreviousLesson}
          disabled={currentLessonIndex === 0}
          className="dark:hover:bg-primary-dark px-6 py-3 transition-transform hover:scale-105 hover:shadow-md dark:bg-primary dark:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
        </Button>
        <Button
          onClick={handleNextLesson}
          disabled={currentLessonIndex === currentCourse.lessons.length - 1}
          className="dark:hover:bg-primary-dark px-6 py-3 transition-transform hover:scale-105 hover:shadow-md dark:bg-primary dark:text-white"
        >
          Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
