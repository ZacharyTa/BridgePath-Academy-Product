import { ReactNode } from "react";

export default function TablesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="tables-layout">
      {/* Add any shared UI elements here, such as a sidebar or header */}
      {children}
    </div>
  );
}
