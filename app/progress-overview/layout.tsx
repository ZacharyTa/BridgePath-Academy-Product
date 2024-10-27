import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import config from "@/config";

export default async function ProgressOverviewPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  return (
    <div className="progress-overview-page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
