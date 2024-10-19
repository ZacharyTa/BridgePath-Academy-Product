"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight } from "lucide-react";

import CourseTitleHeader from "@/components/Course/CourseTitleHeader";
import VideoPlayer from "@/components/Course/VideoPlayer";
import QuizContainer from "@/components/Course/QuizContainer";
import CourseOutline from "@/components/Course/CourseOutline";

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  completed: boolean;
}

interface Course {
  id: number;
  title: string;
  lessons: Lesson[];
  progress: number;
}

export function CoursePlanPageComponent() {
  const [currentCourse, setCurrentCourse] = useState<Course>({
    id: 1,
    title: "Introduction to Digital Marketing",
    lessons: [
      {
        id: 1,
        title: "What is Digital Marketing?",
        videoUrl: "https://example.com/video1.mp4",
        completed: false,
      },
      {
        id: 2,
        title: "Key Digital Marketing Channels",
        videoUrl: "https://example.com/video2.mp4",
        completed: false,
      },
      {
        id: 3,
        title: "Creating a Digital Marketing Strategy",
        videoUrl: "https://example.com/video3.mp4",
        completed: false,
      },
    ],
    progress: 0,
  });

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

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
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseTitleHeader
        title={currentCourse.title}
        progress={currentCourse.progress}
      />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="video" className="w-full">
                <TabsList>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="video">
                  <VideoPlayer
                    videoUrl={
                      currentCourse.lessons[currentLessonIndex].videoUrl
                    }
                    onComplete={handleLessonComplete}
                  />
                </TabsContent>
                <TabsContent value="resources">
                  <p>Additional resources for this lesson...</p>
                </TabsContent>
                <TabsContent value="notes">
                  <textarea
                    className="h-40 w-full rounded border p-2"
                    placeholder="Take notes here..."
                  ></textarea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardContent className="p-6">
              <QuizContainer
                lessonId={currentCourse.lessons[currentLessonIndex].id}
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <CourseOutline
            lessons={currentCourse.lessons}
            currentLessonIndex={currentLessonIndex}
            onSelectLesson={setCurrentLessonIndex}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          onClick={handlePreviousLesson}
          disabled={currentLessonIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
        </Button>
        <Button
          onClick={handleNextLesson}
          disabled={currentLessonIndex === currentCourse.lessons.length - 1}
        >
          Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
