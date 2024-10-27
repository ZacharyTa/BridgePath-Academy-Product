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

export interface Lesson {
  id: number;
  title: string;
  completed: boolean;
  video: Video;
  resources: Resource[];
}

export interface Course {
  id: number;
  title: string;
  lessons: Lesson[];
  progress: number;
  description?: string;
}

// -- Skill Paths --
export interface SkillPath {
  id: number;
  title: string;
  description: string;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  estimated_duration: number; // In hours
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

// -- Filter --

export interface FilterCategory {
  category: string;
  options?: string[];
  id_options?: { id: number; name: string }[];
}

export const templateFilterOptions: FilterCategory[] = [
  {
    category: "Sex",
    options: ["male", "female"],
  },
  {
    category: "Emphasis",
    options: ["Upper Body", "Lower Body", "Full Body"],
  },
  {
    category: "Weekly Workout Rate",
    options: ["2", "3", "4", "5", "6"],
  },
  // Add more categories and options as needed
];

export const exerciseFilterOptions: FilterCategory[] = [
  {
    category: "Muscle Groups",
    id_options: [
      { id: 1, name: "Bicep" },
      { id: 2, name: "Tricep" },
      { id: 3, name: "Chest" },
      { id: 4, name: "Forearm" },
      { id: 5, name: "Abs" },
      { id: 6, name: "Shoulder" },
      { id: 7, name: "Back Width" },
      { id: 8, name: "Back Thickness" },
      { id: 9, name: "Glute" },
      { id: 10, name: "Hamstring" },
      { id: 11, name: "Quadricep" },
      { id: 12, name: "Calf" },
      { id: 13, name: "Abductor" },
      { id: 14, name: "Lower Back" },
      { id: 15, name: "Trap" },
    ],
  },
  {
    category: "Exercise Type",
    options: [
      "Dumbbell",
      "Barbell",
      "Machine",
      "Smith Machine",
      "Cable",
      "Bodyweight",
      "Cardio",
      "Bodyweight Loadable",
      "Plate",
      "Exercise Ball",
      "Kettlebell",
      "Band",
      "Other",
    ],
  },
  {
    category: "Source",
    options: ["Custom"],
  },
];

// -- Goals --
export type HandledBy = "app" | "user"; // replace with actual possible values

export interface GoalData {
  goal_id: number;
  goal_name: string;
  goal_current: number;
  goal_total: number;
  handled_by: HandledBy;
  completed: boolean;
  required: boolean;
}