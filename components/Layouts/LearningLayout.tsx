"use client";
import React, { useState } from "react";
import CourseOutline from "@/components/Course/CourseOutline";
import Header from "@/components/Header/index";
import { CoursePlanPageComponent } from "@/components/course-plan-page";
import { Lesson, Course } from "@/libs/types";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentCourse, setCurrentCourse] = useState<Course>({
    id: 1,
    title: "Introduction to Digital Marketing",
    lessons: [
      {
        id: 1,
        title: "What is Digital Marketing?",
        video: {
          title: "What is Digital Marketing?",
          url: "https://www.youtube.com/watch?v=gkZ4dLMH-B8",
          quiz: [],
        },
        completed: false,
        resources: [],
      },
      {
        id: 2,
        title: "Key Digital Marketing Channels",
        video: {
          title: "Key Digital Marketing Channels",
          url: "https://www.youtube.com/watch?v=At8v_Yc044Y",
          quiz: [],
        },
        completed: false,
        resources: [],
      },
      {
        id: 3,
        title: "Creating a Digital Marketing Strategy",
        video: {
          title: "Creating a Digital Marketing Strategy",
          url: "https://www.youtube.com/watch?v=Ng_6mK-Zm9E",
          quiz: [],
        },
        completed: false,
        resources: [],
      },
    ],
    progress: 0,
  });

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <CourseOutline
          lessons={currentCourse.lessons}
          currentLessonIndex={currentLessonIndex}
          onSelectLesson={setCurrentLessonIndex}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <CoursePlanPageComponent
                lessons={currentCourse.lessons}
                currentLessonIndexParam={currentLessonIndex}
                onSelectLesson={setCurrentLessonIndex}
              />
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
