// StartedSkillPaths.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getUserProgress, UserProgress } from "@/helper/progressStorage";
import { getSkillPathCompletionPercent } from "@/helper/progressHelpers";
import skillPaths from "@/skillPaths";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StartedSkillPath {
  id: number;
  title: string;
  completionPercent: number;
}

const StartedSkillPaths: React.FC = () => {
  const [startedSkillPaths, setStartedSkillPaths] = useState<
    StartedSkillPath[]
  >([]);

  useEffect(() => {
    const userProgress: UserProgress = getUserProgress();
    const startedPaths: StartedSkillPath[] = skillPaths
      .filter((path) => userProgress.skillPaths[path.id])
      .map((path) => ({
        id: path.id,
        title: path.title,
        completionPercent: getSkillPathCompletionPercent(path.id, userProgress),
      }));

    setStartedSkillPaths(startedPaths);
  }, []);

  if (startedSkillPaths.length === 0) {
    return <div>No started skill paths found.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold dark:text-white">
        Started Skill Paths
      </h2>
      <div className="space-y-4">
        {startedSkillPaths.map((path) => (
          <Card
            key={path.id}
            className="dark:border-strokedark dark:bg-boxdark-2"
          >
            <CardHeader className="p-4">
              <CardTitle className="dark:text-white">{path.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Progress value={path.completionPercent} className="h-4 w-full" />
              <p className="mt-2 text-center text-sm font-medium">
                {Math.round(path.completionPercent)}% Completed
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StartedSkillPaths;
