// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { AppProvider } from "@/context/AppContext";
export const dynamic = "force-dynamic";
export const runtime = "edge";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
export default async function Dashboard() {
  // const supabase = createServerComponentClient({ cookies });
  // // const { data } = await supabase.from("recovery").select();
  return (
    <AppProvider>
      <DefaultLayout>
        <HomeLayout />
      </DefaultLayout>
    </AppProvider>
  );
}
