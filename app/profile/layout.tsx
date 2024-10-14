import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="profile-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
