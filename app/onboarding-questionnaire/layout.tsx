import { ReactNode } from "react";

export default function OnboardingQuestionnairePageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="onboarding-questionnaire-page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
