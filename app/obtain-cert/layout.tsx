import { ReactNode } from "react";

export default function ObtainCertPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="obtain-cert--page-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
