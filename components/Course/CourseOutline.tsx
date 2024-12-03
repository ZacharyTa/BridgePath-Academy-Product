"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock } from "lucide-react";
import ClickOutside from "@/components/ClickOutside";
import { Lesson } from "@/libs/types";
import { setUserLessonId } from "@/helper/useCookies";

interface CourseOutlineProps {
  lessons: Lesson[];
  currentLessonIndex: number;
  onSelectLesson: (index: number) => void;
}

export default function CourseOutline({
  lessons,
  currentLessonIndex,
  onSelectLesson,
}: CourseOutlineProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLessonClick = (index: number) => {
    setUserLessonId(lessons[index].id);
    onSelectLesson(index);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute left-0 top-0 z-10 m-4"
      >
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15l-5-5 5-5v10z"
            fill=""
          />
        </svg>
      </button>
      <ClickOutside onClick={() => setSidebarOpen(false)}>
        <aside
          className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
            <h2 className="text-xl font-semibold text-white">Course Outline</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              className="block lg:hidden"
            >
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15l-5-5 5-5v10z"
                  fill=""
                />
              </svg>
            </button>
          </div>
          <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <div className="space-y-2 px-4 py-4">
              {lessons.map((lesson, index) => (
                <Button
                  key={lesson.id}
                  variant={index === currentLessonIndex ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleLessonClick(index)}
                  disabled={!lesson.completed && index > currentLessonIndex}
                >
                  {lesson.completed ? (
                    <CheckCircle
                      className="mr-2 h-4 w-4 text-green-500"
                      style={{ fontSize: "1.1rem" }}
                    />
                  ) : index > currentLessonIndex ? (
                    <Lock className="mr-2 h-4 w-4" />
                  ) : null}
                  {lesson.title}
                </Button>
              ))}
            </div>
          </div>
        </aside>
      </ClickOutside>
    </div>
  );
}
