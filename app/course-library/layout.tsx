import { ReactNode } from "react";

export default function CourseLibraryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="course-library-page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
