import { Button } from "@/components/ui/button";
import { CheckCircle, Lock } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

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
  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-semibold">Course Outline</h2>
      {lessons.map((lesson, index) => (
        <Button
          key={lesson.id}
          variant={index === currentLessonIndex ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => onSelectLesson(index)}
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
  );
}
