// progressHelpers.ts
import {
  getUserProgress,
  setUserProgress,
  UserProgress,
} from "./progressStorage";

import { SkillPath } from "@/libs/types";
import skillPaths from "@/skillPaths";

export function markVideoCompleted(
  skillPathId: number,
  courseId: number,
  lessonId: number,
) {
  const progress = getUserProgress();

  if (!progress.skillPaths[skillPathId]) {
    progress.skillPaths[skillPathId] = { completed: false, courses: {} };
  }
  if (!progress.skillPaths[skillPathId].courses[courseId]) {
    progress.skillPaths[skillPathId].courses[courseId] = {
      completed: false,
      lessons: {},
    };
  }
  if (!progress.skillPaths[skillPathId].courses[courseId].lessons[lessonId]) {
    progress.skillPaths[skillPathId].courses[courseId].lessons[lessonId] = {
      videoCompleted: false,
      quizzesCompleted: [],
      completed: false,
    };
  }

  progress.skillPaths[skillPathId].courses[courseId].lessons[
    lessonId
  ].videoCompleted = true;
  setUserProgress(progress);
}

export function markQuizCompleted(
  skillPathId: number,
  courseId: number,
  lessonId: number,
  quizId: number,
) {
  const progress = getUserProgress();
  // similar logic to ensure keys exist, then push quizId if not already completed
  const lesson = ensureLesson(progress, skillPathId, courseId, lessonId);
  if (!lesson.quizzesCompleted.includes(quizId)) {
    lesson.quizzesCompleted.push(quizId);
  }
  setUserProgress(progress);
}

function ensureLesson(
  progress: UserProgress,
  skillPathId: number,
  courseId: number,
  lessonId: number,
) {
  if (!progress.skillPaths[skillPathId]) {
    progress.skillPaths[skillPathId] = { completed: false, courses: {} };
  }
  if (!progress.skillPaths[skillPathId].courses[courseId]) {
    progress.skillPaths[skillPathId].courses[courseId] = {
      completed: false,
      lessons: {},
    };
  }
  if (!progress.skillPaths[skillPathId].courses[courseId].lessons[lessonId]) {
    progress.skillPaths[skillPathId].courses[courseId].lessons[lessonId] = {
      videoCompleted: false,
      quizzesCompleted: [],
      completed: false,
    };
  }
  return progress.skillPaths[skillPathId].courses[courseId].lessons[lessonId];
}

export function isLessonCompleted(
  skillPathId: number,
  courseId: number,
  lessonId: number,
  userProgress: UserProgress,
) {
  const sp = skillPaths.find((sp) => sp.id === skillPathId);
  if (!sp) return false;

  const course = sp.courses.find((c) => c.id === courseId);
  if (!course) return false;

  const lesson = course.lessons.find((l) => l.id === lessonId);
  if (!lesson) return false;

  const lessonProgress =
    userProgress.skillPaths[skillPathId]?.courses[courseId]?.lessons[lessonId];
  if (!lessonProgress) return false;

  // Check if video is complete and all quizzes are done
  const allQuizzes = lesson.video.quiz.map((q) => q.id);
  const completedQuizzes = lessonProgress.quizzesCompleted;
  const allQuizzesCompleted = allQuizzes.every((qId) =>
    completedQuizzes.includes(qId),
  );

  return lessonProgress.videoCompleted && allQuizzesCompleted;
}

function isCourseCompleted(
  skillPathId: number,
  courseId: number,
  userProgress: UserProgress,
): boolean {
  const sp = skillPaths.find((sp) => sp.id === skillPathId);
  if (!sp) return false;

  const course = sp.courses.find((c) => c.id === courseId);
  if (!course) return false;

  const totalLessons = course.lessons.length;
  if (totalLessons === 0) return false;

  const completedLessons = course.lessons.filter((lesson) =>
    isLessonCompleted(skillPathId, courseId, lesson.id, userProgress),
  ).length;

  return completedLessons === totalLessons;
}

export function getCourseCompletionPercent(
  skillPathId: number,
  courseId: number,
  userProgress: UserProgress,
): number {
  const sp = skillPaths.find((sp) => sp.id === skillPathId);
  if (!sp) return 0;

  const course = sp.courses.find((c) => c.id === courseId);
  if (!course) return 0;

  const totalLessons = course.lessons.length;
  if (totalLessons === 0) return 0;

  const completedLessons = course.lessons.filter((lesson) =>
    isLessonCompleted(skillPathId, courseId, lesson.id, userProgress),
  ).length;

  return (completedLessons / totalLessons) * 100;
}

export function getSkillPathCompletionPercent(
  skillPathId: number,
  userProgress: UserProgress,
): number {
  const sp = skillPaths.find((sp) => sp.id === skillPathId);
  if (!sp) return 0;

  const totalCourses = sp.courses.length;
  if (totalCourses === 0) return 0;

  const completedCourses = sp.courses.filter((course) =>
    isCourseCompleted(skillPathId, course.id, userProgress),
  ).length;

  return (completedCourses / totalCourses) * 100;
}
