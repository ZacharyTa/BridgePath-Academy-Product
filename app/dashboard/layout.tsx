import { ReactNode } from "react";

export default function DashboardPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="dashboard-page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
