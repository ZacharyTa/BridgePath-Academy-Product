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

export function clearCookies() {
  Cookies.remove("skillPathId");
  Cookies.remove("courseId");
  Cookies.remove("userLessonId");
}