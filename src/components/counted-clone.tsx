import * as React from "react";

export interface CountedCloneProps {
  element: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

export function CountedClone({ element }: CountedCloneProps) {
  const childCount = React.Children.count(element.props.children);

  return React.cloneElement(element, {
    ["data-child-count" as `data-${string}`]: String(childCount),
  });
}
