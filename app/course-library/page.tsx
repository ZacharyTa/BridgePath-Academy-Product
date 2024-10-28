// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AppProvider } from "@/context/AppContext";
export const dynamic = "force-dynamic";
export const runtime = "edge";
import { CourseLibrary } from "@/components/CourseLibrary";
import CourseCard from "@/components/Cards/CourseCard";
import skillPaths from "@/skillPaths";

// interface CourseCardProps {
//   label?: "Skill Path" | "Free Course";
//   title?: string;
//   description?: string;
//   difficulty?: "Beginner" | "Intermediate" | "Advanced";
//   duration?: string;
//   courseCount?: number;
//   jobCategory?: string;
//   includesCertificate?: boolean;
//   includesProject?: boolean;
// }

// export default function CourseCard({
//   label = "Skill Path",
//   title = "Web Development",
//   description = "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
//   difficulty = "Beginner",
//   duration = "40 Hours",
//   courseCount = 9,
//   jobCategory = "Technology",
//   includesCertificate = true,
//   includesProject = true,
// }}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
export default async function CourseLibraryPage() {
  // const supabase = createServerComponentClient({ cookies });
  // // const { data } = await supabase.from("recovery").select();
  return (
    <AppProvider>
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
          {skillPaths.map((skillPath) => (
            <div
              key={skillPath.id}
              className="flex items-center justify-center"
            >
              <CourseCard
                label="Skill Path"
                id={skillPath.id}
                title={skillPath.title}
                description={skillPath.description}
                difficulty={skillPath.difficulty_level}
                duration={`${skillPath.duration} Hours`}
                courseCount={skillPath.courses.length}
                jobCategory="Marketing"
                includesCertificate={true}
                includesProject={true}
                hasAccess={skillPath.has_access}
              />
            </div>
          ))}
        </div>
      </DefaultLayout>
    </AppProvider>
  );
}
