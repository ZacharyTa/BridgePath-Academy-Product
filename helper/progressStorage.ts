// useCookies.ts
import Cookies from "js-cookie";

export interface UserProgress {
  skillPaths: {
    [skillPathId: number]: {
      completed: boolean;
      courses: {
        [courseId: number]: {
          completed: boolean;
          lessons: {
            [lessonId: number]: {
              videoCompleted: boolean;
              quizzesCompleted: number[];
              completed: boolean;
            };
          };
        };
      };
    };
  };
}

const DEFAULT_PROGRESS: UserProgress = { skillPaths: {} };

export function getUserProgress(): UserProgress {
  const data = Cookies.get("userProgress");
  return data ? JSON.parse(data) : DEFAULT_PROGRESS;
}

export function setUserProgress(progress: UserProgress) {
  Cookies.set("userProgress", JSON.stringify(progress));
}
