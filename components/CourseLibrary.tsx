import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Introduction to Python",
    category: "Programming",
    duration: "4 weeks",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    category: "Data Science",
    duration: "6 weeks",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    category: "Design",
    duration: "3 weeks",
  },
  {
    id: 4,
    title: "Full-Stack Web Development",
    category: "Web Development",
    duration: "12 weeks",
  },
];

export function CourseLibrary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Library</CardTitle>
        <CardDescription>Explore our wide range of courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">Duration: {course.duration}</p>
                <Button>Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
