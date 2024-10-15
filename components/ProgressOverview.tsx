import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const courses = [
  { id: 1, title: "Introduction to React", progress: 75 },
  { id: 2, title: "Advanced JavaScript", progress: 40 },
  { id: 3, title: "CSS Mastery", progress: 90 },
];

export function ProgressOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Overview</CardTitle>
        <CardDescription>Track your course completion</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id}>
              <div className="mb-1 flex justify-between">
                <span className="text-sm font-medium">{course.title}</span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="w-full" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
