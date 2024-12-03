"use client";
import React, { useState, useEffect } from "react";
import CourseOutline from "@/components/Course/CourseOutline";
import Header from "@/components/Header/index";
import { CoursePlanPageComponent } from "@/components/course-plan-page";
import { Course } from "@/libs/types";
import skillPaths from "@/skillPaths";
import { getCourseId, getLessonId } from "@/helper/useCookies";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  useEffect(() => {
    const courseId = getCourseId();

    if (courseId) {
      let foundCourse: Course | undefined;

      for (const skillPath of skillPaths) {
        foundCourse = skillPath.courses.find(
          (course) => course.id === courseId,
        );
        if (foundCourse) break;
      }

      if (foundCourse) {
        setCurrentCourse(foundCourse);
      }
    } else {
      // Handle case when courseId is not set
      // For example, redirect to course library
    }
  }, []);

  if (!currentCourse) {
    return <div>Loading...</div>;
  }

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
