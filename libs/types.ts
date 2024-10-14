// -- Exercises
export interface MuscleData {
  id: number;
  muscle_name: string;
  num_exercises: number;
  num_sets: number;
  recovery_days: number;
  day_of_week: string;
  template_name: string;
}

export interface Set {
  set: number;
  weight: number;
  reps: number;
  logged: boolean;
}

export interface Exercise {
  id: number;
  name: string;
  muscles: string[];
  sets: Set[];
  prev_sets?: Set[];
  pref_order: number;
  day_of_week: string;
  is_custom: boolean;
}

// Assuming this is the structure of ExerciseItemProps
export interface ExerciseItemProps {
  exercise_id: number;
  exercise_name: string;
  exercise_type: string;
  muscle_name: string;
  is_custom: boolean;
}

// Convert ExerciseItemProps to Exercise
export const convertToExercise = (item: ExerciseItemProps): Exercise => ({
  id: item.exercise_id,
  name: item.exercise_name,
  muscles: [item.muscle_name],
  sets: [],
  prev_sets: [],
  pref_order: 0,
  day_of_week: "",
  is_custom: item.is_custom,
});

// -- Templates --

export interface DayPlan {
  muscleGroups: MuscleGroup[];
}

export interface MuscleGroup {
  id: string;
  muscle_id: number;
  muscle_name: string;
  exercises?: Exercise[];
}

export interface WeeklyProgram {
  [day: string]: DayPlan;
}

export interface Template {
  sex: string;
  template_name: string;
  emphasis: string;
  weekly_workout_rate: string;
  weekly_program: WeeklyProgram;
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

// -- Stats --

export interface DataPoint {
  x: string;
  y: number;
}

export interface LineChartData {
  id: string;
  color: string;
  data: DataPoint[];
}
