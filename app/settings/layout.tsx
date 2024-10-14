import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="settings-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
