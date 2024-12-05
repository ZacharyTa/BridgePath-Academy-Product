import { ReactNode } from "react";

export default function SubscriptionPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="subscription-page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
