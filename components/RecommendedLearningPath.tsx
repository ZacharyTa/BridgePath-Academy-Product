import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recommendedPaths = [
  { id: 1, title: "Web Development Fundamentals", duration: "8 weeks" },
  { id: 2, title: "Data Science Essentials", duration: "10 weeks" },
  { id: 3, title: "Mobile App Development", duration: "12 weeks" },
];

export function RecommendedLearningPath() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Learning Paths</CardTitle>
        <CardDescription>
          Based on your interests and experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendedPaths.map((path) => (
            <li key={path.id} className="bg-gray-100 rounded p-3">
              <h3 className="font-semibold">{path.title}</h3>
              <p className="text-gray-600 text-sm">Duration: {path.duration}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
