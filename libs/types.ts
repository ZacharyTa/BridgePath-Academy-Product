export interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  question_text: string;
  options: Option[];
}

// -- Quizzes --
export interface Quiz {
  id: number;
  questions: Question[];
}

// Videos
export interface Video {
  title: string;
  url: string;
  quiz: Quiz[];
}

// -- Resources --
export interface Resource {
  id: number;
  resource_link: string;
  resource_type: "article" | "video" | "website";
}

export interface ProjectTask {
  id: number;
  title: string;
  description: string;
}

export interface Lesson {
  id: number;
  title: string;
  video: Video;
  resources: Resource[];
  projectTasks?: ProjectTask[]; // Add this line
}

export interface Course {
  id: number;
  title: string;
  lessons: Lesson[];
  description?: string;
}

// -- Skill Paths --
export interface SkillPath {
  id: number;
  requiredSubscriptionLevel: "Free" | "Basic" | "Advanced";
  title: string;
  description: string;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // In hours
  courses: Course[];
  has_access: boolean;
}

// -- Users --
export interface User {
  user_id: number;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
}

export interface CertificateProps {
  certificationName: string;
  dateAcquired: string;
  issuer: string;
  recipientName: string;
  skills: string[];
  hasProject: boolean;
}
