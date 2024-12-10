import { ReactNode } from "react";

export default function VerifyPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="verify-page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
