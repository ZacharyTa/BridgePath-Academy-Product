import { ReactNode } from "react";

export default function ProgressOverviewPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="progress-overview-page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
