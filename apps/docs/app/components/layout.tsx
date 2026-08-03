import type { ReactNode } from "react";

import { DocsSidebar } from "@/components/docs-sidebar";

export default function ComponentsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="docs-shell">
      <DocsSidebar />
      <div className="docs-content">{children}</div>
    </main>
  );
}
