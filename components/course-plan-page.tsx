"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import CourseTitleHeader from "@/components/Course/CourseTitleHeader";
import VideoPlayer from "@/components/Course/VideoPlayer";
import QuizContainer from "@/components/Course/QuizContainer";
import { Course, Lesson } from "@/libs/types";
import {
  setUserLessonId,
  getUserLessonId,
  setCompletedLessons,
  getCompletedLessons,
  getCompletedVideos,
  getCompletedQuizzes,
  getSkillPathId,
  getSubscription,
} from "@/helper/useCookies";

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
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const skillPathId = getSkillPathId() || 0;

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

    // Load completed lessons from cookies
    const completedLessonIds = getCompletedLessons(skillPathId!) || [];

    const updatedLessons = lessons.map((lesson) => ({
      ...lesson,
      completed: completedLessonIds.includes(lesson.id),
    }));

    setCurrentCourse((prevCourse) => ({
      ...prevCourse,
      lessons: updatedLessons,
    }));

    // Calculate progress
    const progress = (completedLessonIds.length / updatedLessons.length) * 100;
    setCurrentCourse((prevCourse) => ({
      ...prevCourse,
      progress,
    }));
  }, [lessons, currentLessonIndexParam, onSelectLesson]);

  useEffect(() => {
    // Reset completion states
    setIsVideoCompleted(false);
    setIsQuizCompleted(false);

    const completedVideos = getCompletedVideos(skillPathId) || [];
    if (
      completedVideos.includes(currentCourse.lessons[currentLessonIndex].id)
    ) {
      setIsVideoCompleted(true);
    }

    const completedQuizzes = getCompletedQuizzes(skillPathId) || [];
    const currentQuizIds =
      currentCourse.lessons[currentLessonIndex].video.quiz.map((q) => q.id) ||
      [];

    if (currentQuizIds.every((id: number) => completedQuizzes.includes(id))) {
      setIsQuizCompleted(true);
    }

    checkLessonCompletion();
  }, [currentLessonIndex]);

  const handleVideoComplete = () => {
    setIsVideoCompleted(true);
    checkLessonCompletion();
  };

  const handleQuizComplete = () => {
    setIsQuizCompleted(true);
    checkLessonCompletion();
  };

  const checkLessonCompletion = () => {
    const currentLesson = currentCourse.lessons[currentLessonIndex];
    const hasQuiz =
      currentLesson.video.quiz && currentLesson.video.quiz.length > 0;

    if (isVideoCompleted && (!hasQuiz || isQuizCompleted)) {
      handleLessonComplete();
    }
  };

  const handleLessonComplete = () => {
    const updatedLessons = [...currentCourse.lessons];
    updatedLessons[currentLessonIndex].completed = true;

    // Get the list of completed lesson IDs
    const completedLessons = updatedLessons
      .filter((lesson) => lesson.completed)
      .map((lesson) => lesson.id);

    // Save to cookies
    setCompletedLessons(skillPathId!, completedLessons);

    const progress = (completedLessons.length / updatedLessons.length) * 100;
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
                    lessonId={currentCourse.lessons[currentLessonIndex].id}
                    onVideoComplete={handleVideoComplete}
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
              onQuizComplete={handleQuizComplete}
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

// TODO
// Completed Course/Lessons logic almost completed. Need to:
// 1. Format to save into cookies, completedQuizzes_[skillpath]_[courseid]_[lessonid].
//     - (maybe use cookies, getLessonID, getCourseID, getSkillPathID? Im scared it will ruin some other code logic in other files),
// 2. Change Progress in main skilklpath layout page thing and progress in course learning layout to reflect correct progress values.
// 3. Create helper file to easily obtain users progress for the progress path later on!...
// This should compelte
//  - Progress Page
// Last things to implement are:
// - Certifications (easy, takes one day)
// - Projects (easy, takes one day)
// - User Profile (easy, takes one day) Shows user progress, certifications, projects, subscription, ButtonAccount.tsx
// - Stripe payment and Student & Corporate Clients(Just show skeleton: "Coming soon") (easy, takes one day)
// estimated time to complete: 4 days
