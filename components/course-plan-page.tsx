"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, CheckCircle, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import CourseTitleHeader from "@/components/Course/CourseTitleHeader";
import VideoPlayer from "@/components/Course/VideoPlayer";
import QuizContainer from "@/components/Course/QuizContainer";
import { Course, Lesson } from "@/libs/types";
import {
  setUserLessonId,
  getUserLessonId,
  getSkillPathId,
  getCourseId,
} from "@/helper/useCookies";
import { getUserProgress } from "@/helper/progressStorage";
import {
  markVideoCompleted,
  markQuizCompleted,
  getCourseCompletionPercent,
  isLessonCompleted,
  markProjectTaskCompleted,
  areAllProjectTasksCompleted,
} from "@/helper/progressHelpers";

interface CoursePlanPageComponentProps {
  lessons: Lesson[];
  currentLessonIndexParam: number;
  onSelectLesson: (index: number) => void;
}

export const CoursePlanPageComponent: React.FC<
  CoursePlanPageComponentProps
> = ({ lessons, currentLessonIndexParam, onSelectLesson }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(
    currentLessonIndexParam,
  );
  const [courseProgress, setCourseProgress] = useState(0);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [projectTasksCompleted, setProjectTasksCompleted] = useState(false);

  const skillPathId = getSkillPathId() || 0;
  const courseId = getCourseId() || 0;

  const router = useRouter();

  useEffect(() => {
    // Get lesson ID from cookies
    const lessonId = getUserLessonId();
    if (lessonId) {
      const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
      if (lessonIndex !== -1) {
        setCurrentLessonIndex(lessonIndex);
        onSelectLesson(lessonIndex);
      }
    } else {
      setCurrentLessonIndex(currentLessonIndexParam);
    }

    // Load user progress and calculate course completion percentage
    const userProgress = getUserProgress();
    const progressPercent = getCourseCompletionPercent(
      skillPathId,
      courseId,
      userProgress,
    );
    console.log("progressPercent", progressPercent);
    setCourseProgress(progressPercent);

    // Calculate lesson completion percentage
    const lessonCompleted = isLessonCompleted(
      skillPathId,
      courseId,
      lessons[currentLessonIndex].id,
      userProgress,
    );

    // Update completed tasks
    const lessonProgress =
      userProgress.skillPaths[skillPathId]?.courses[courseId]?.lessons[
        lessons[currentLessonIndex].id
      ];
    setCompletedTasks(lessonProgress?.projectTasksCompleted || []);

    // Check if video is completed
    setVideoCompleted(lessonProgress?.videoCompleted || false);

    // Check if all project tasks are completed
    setProjectTasksCompleted(
      areAllProjectTasksCompleted(
        skillPathId,
        courseId,
        lessons[currentLessonIndex].id,
        userProgress,
      ),
    );
  }, [
    lessons,
    currentLessonIndexParam,
    onSelectLesson,
    skillPathId,
    courseId,
    currentLessonIndex,
    expandedTaskId,
  ]);

  const handleVideoComplete = () => {
    const currentLessonId = lessons[currentLessonIndex].id;
    markVideoCompleted(skillPathId, courseId, currentLessonId);
    updateProgress();
    setVideoCompleted(true);
  };

  const handleQuizComplete = (quizId: number) => {
    const currentLessonId = lessons[currentLessonIndex].id;
    markQuizCompleted(skillPathId, courseId, currentLessonId, quizId);
    updateProgress();
  };

  const updateProgress = () => {
    const userProgress = getUserProgress();
    const progressPercent = getCourseCompletionPercent(
      skillPathId,
      courseId,
      userProgress,
    );
    setCourseProgress(progressPercent);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextLessonIndex = currentLessonIndex + 1;
      setUserLessonId(lessons[nextLessonIndex].id);
      setCurrentLessonIndex(nextLessonIndex);
      onSelectLesson(nextLessonIndex);
    } else if (currentLessonIndex === lessons.length - 1) {
      // Redirect to progress overview page
      router.push("/progress-overview");
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLessonIndex = currentLessonIndex - 1;
      setUserLessonId(lessons[prevLessonIndex].id);
      setCurrentLessonIndex(prevLessonIndex);
      onSelectLesson(prevLessonIndex);
    }
  };

  const handleTaskToggle = (taskId: number) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleTaskCheckboxChange = (taskId: number) => {
    markProjectTaskCompleted(skillPathId, courseId, currentLesson.id, taskId);
    updateProgress();
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
    setProjectTasksCompleted(
      areAllProjectTasksCompleted(
        skillPathId,
        courseId,
        currentLesson.id,
        getUserProgress(),
      ),
    );
  };

  if (!lessons || lessons.length === 0) {
    return <div>Loading...</div>;
  }

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="container mx-auto bg-white px-4 py-8 dark:bg-boxdark dark:text-bodydark">
      <CourseTitleHeader
        title={currentLesson.title}
        progress={courseProgress}
        details={`${currentLessonIndex + 1}/${lessons.length} lessons completed`}
      />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-3">
          <Card className="dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark">
            <CardContent className="p-6">
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="gap-4 dark:bg-boxdark dark:text-bodydark">
                  <TabsTrigger
                    value="video"
                    className={`rounded-md dark:text-bodydark ${
                      videoCompleted ? "bg-success/50" : "bg-warning/50"
                    }`}
                  >
                    <span className="flex items-center">
                      {videoCompleted ? (
                        <CheckCircle className="mr-1 h-4 w-4 text-success" />
                      ) : (
                        <LoaderCircle className="mr-1 h-4 w-4 text-warning" />
                      )}{" "}
                      Video
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="projectTasks"
                    className={`rounded-md dark:text-bodydark ${
                      projectTasksCompleted ? "bg-success/50" : "bg-warning/50"
                    }`}
                  >
                    <span className="flex items-center">
                      {projectTasksCompleted ? (
                        <CheckCircle className="mr-1 h-4 w-4 text-success" />
                      ) : (
                        <LoaderCircle className="mr-1 h-4 w-4 text-warning" />
                      )}{" "}
                      Project Tasks
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className="rounded-md bg-slate-300 dark:text-bodydark"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="mr-1 h-4 w-4" /> Resources
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="rounded-md bg-slate-300 dark:text-bodydark"
                  >
                    <span className="flex items-center">
                      <ArrowRight className="mr-1 h-4 w-4" /> Notes
                    </span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="video"
                  className="rounded-md dark:bg-boxdark dark:text-bodydark"
                >
                  <VideoPlayer
                    videoUrl={currentLesson.video.url}
                    lessonId={currentLesson.id}
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
                <TabsContent
                  value="projectTasks"
                  className="bg:white dark:bg-boxdark dark:text-bodydark"
                >
                  {currentLesson.projectTasks &&
                  currentLesson.projectTasks.length > 0 ? (
                    <div className="space-y-4">
                      {currentLesson.projectTasks.map((task) => {
                        const isChecked = completedTasks.includes(task.id);

                        return (
                          <div
                            key={task.id}
                            className={`rounded-box p-4 dark:bg-boxdark ${
                              isChecked ? "bg-success/25" : ""
                            }`}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="checkbox"
                                checked={isChecked}
                                onChange={() =>
                                  handleTaskCheckboxChange(task.id)
                                }
                              />
                              <div
                                className="ml-2 cursor-pointer text-xl font-medium"
                                onClick={() => handleTaskToggle(task.id)}
                              >
                                {task.title}
                              </div>
                            </div>
                            {expandedTaskId === task.id && (
                              <div className="ml-6 mt-2 bg-warning/20 text-black dark:text-white">
                                <p>{task.description}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>No project tasks for this lesson.</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-8 dark:border-strokedark dark:bg-boxdark-2 dark:text-bodydark">
            <QuizContainer
              quizzes={currentLesson.video.quiz}
              lessonId={currentLesson.id}
              onQuizComplete={handleQuizComplete}
            />
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          onClick={handlePreviousLesson}
          disabled={currentLessonIndex === 0}
          className="dark:hover:bg-primary-dark dark:bg-primarytext-white px-6 py-3 transition-transform hover:scale-105 hover:shadow-md"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
        </Button>
        <Button
          onClick={handleNextLesson}
          disabled={currentLessonIndex === lessons.length}
          className="dark:hover:bg-primary-dark px-6 py-3 text-white transition-transform hover:scale-105 hover:shadow-md dark:bg-primary"
        >
          {currentLessonIndex === lessons.length - 1 ? (
            <>
              Finish <CheckCircle className="ml-2 h-4 w-4 text-success" />
            </>
          ) : (
            <>
              Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
