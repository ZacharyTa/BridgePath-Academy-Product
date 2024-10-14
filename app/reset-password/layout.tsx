import { ReactNode } from "react";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import { Suspense } from "react";

export const metadata = getSEOTags({
  title: `Reset Password for ${config.appName}`,
  canonicalUrlRelative: "/reset-password",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  );
}
