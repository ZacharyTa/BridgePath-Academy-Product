import { ReactNode } from "react";

export default function RecommendedLearningPathPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="recommended-learning-path-page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
