import { ReactNode } from "react";

export default function UILayout({ children }: { children: ReactNode }) {
  return (
    <div className="ui-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
