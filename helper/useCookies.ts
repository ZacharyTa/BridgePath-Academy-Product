// useCookies.ts
import Cookies from "js-cookie";

export function setSkillPathId(skillPathId: number) {
  Cookies.set("skillPathId", skillPathId.toString());
}

export function getSkillPathId(): number | null {
  const skillPathId = Cookies.get("skillPathId");
  return skillPathId ? parseInt(skillPathId, 10) : null;
}

export function setCourseId(courseId: number) {
  Cookies.set("courseId", courseId.toString());
}

export function getCourseId(): number | null {
  const courseId = Cookies.get("courseId");
  return courseId ? parseInt(courseId, 10) : null;
}

export function setUserLessonId(lessonId: number) {
  Cookies.set("userLessonId", lessonId.toString());
}

export function getUserLessonId(): number | null {
  const lessonId = Cookies.get("userLessonId");
  return lessonId ? parseInt(lessonId, 10) : null;
}

export function setCompletedLessons(
  skillPathId: number,
  courseId: number,
  completedLessons: number[],
) {
  Cookies.set(
    `completedLessons_${skillPathId}_${courseId}`,
    JSON.stringify(completedLessons),
  );
}

export function getCompletedLessons(
  skillPathId: number,
  courseId: number,
): number[] {
  const data = Cookies.get(`completedLessons_${skillPathId}_${courseId}`);
  return data ? JSON.parse(data) : [];
}

export function setCompletedQuizzes(
  skillPathId: number,
  courseId: number,
  lessonId: number,
  completedQuizzes: number[],
) {
  Cookies.set(
    `completedQuizzes_${skillPathId}_${courseId}_${lessonId}`,
    JSON.stringify(completedQuizzes),
  );
}

export function getCompletedQuizzes(
  skillPathId: number,
  courseId: number,
  lessonId: number,
): number[] {
  const data = Cookies.get(
    `completedQuizzes_${skillPathId}_${courseId}_${lessonId}`,
  );
  return data ? JSON.parse(data) : [];
}

export function setCompletedVideos(
  skillPathId: number,
  courseId: number,
  lessonId: number,
) {
  Cookies.set(`completedVideos_${skillPathId}_${courseId}_${lessonId}`, "true");
}

export function getCompletedVideos(
  skillPathId: number,
  courseId: number,
  lessonId: number,
): boolean {
  return (
    Cookies.get(`completedVideos_${skillPathId}_${courseId}_${lessonId}`) ===
    "true"
  );
}

// New Cookies doesn't work with code, I need to sit down and think about how to structure this

export function setSubscription(subscription: string) {
  Cookies.set(`subscription`, subscription.toString());
}

export function getSubscription(): string {
  const data = Cookies.get(`subscription`);
  return data ? data.toString() : null;
}

export function clearCookies() {
  Cookies.remove("skillPathId");
  Cookies.remove("courseId");
  Cookies.remove("userLessonId");
}
