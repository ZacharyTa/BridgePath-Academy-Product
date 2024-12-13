import { ReactNode, Suspense } from "react";

export default function SubscriptionPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="subscription-page-layout">
        {/* Add any shared UI elements here, such as a sidebar or header */}
        {children}
      </div>
    </Suspense>
  );
}
