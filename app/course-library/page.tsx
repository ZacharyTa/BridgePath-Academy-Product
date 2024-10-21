// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AppProvider } from "@/context/AppContext";
export const dynamic = "force-dynamic";
export const runtime = "edge";
import { CourseLibrary } from "@/components/CourseLibrary";
import CourseCard from "@/components/Cards/CourseCard";

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
          <div className="flex items-center justify-center">
            <CourseCard
              label="Skill Path"
              title="Email Marketing w/ Zapier"
              description="Automate your email marketing campaigns using Zapier."
              difficulty="Intermediate"
              duration="20 Hours"
              courseCount={5}
              jobCategory="Marketing"
              includesCertificate={true}
              includesProject={true}
            />
          </div>
          <div className="flex items-center justify-center">
            <CourseCard
              label="Free Course"
              title="Marketing CRM with Klaviyo"
              description="Learn how to manage customer relationships using Klaviyo."
              difficulty="Beginner"
              duration="15 Hours"
              courseCount={3}
              jobCategory="Marketing"
              includesCertificate={false}
              includesProject={true}
            />
          </div>
          <div className="flex items-center justify-center">
            <CourseCard
              label="Skill Path"
              title="Advanced SEO Techniques"
              description="Master advanced SEO techniques to improve your website's ranking."
              difficulty="Advanced"
              duration="30 Hours"
              courseCount={7}
              jobCategory="SEO"
              includesCertificate={true}
              includesProject={false}
            />
          </div>
          <div className="flex items-center justify-center">
            <CourseCard
              label="Free Course"
              title="Content Marketing Strategy"
              description="Develop a comprehensive content marketing strategy."
              difficulty="Intermediate"
              duration="25 Hours"
              courseCount={6}
              jobCategory="Content Marketing"
              includesCertificate={true}
              includesProject={true}
            />
          </div>
        </div>
      </DefaultLayout>
    </AppProvider>
  );
}
