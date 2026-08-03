import type { ReactElement } from "react";

export interface RepeatChildrenProps {
  children: ReactElement;
}

export function RepeatChildren({ children }: RepeatChildrenProps) {
  return <>{children}{children}</>;
}
