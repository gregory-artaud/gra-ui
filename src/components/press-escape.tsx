import * as React from "react";

export interface PressEscapeProps {
  children: React.ReactNode;
}

function isPressKey(key: string) {
  return key === "Enter" || key === " ";
}

export function PressEscape({ children }: PressEscapeProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <button
      className="gra-ui press-escape"
      data-pressed={isPressed ? "true" : "false"}
      onBlur={() => setIsPressed(false)}
      onKeyDown={(event) => {
        if (isPressKey(event.key)) {
          event.preventDefault();
          setIsPressed(true);
        }
      }}
      onKeyUp={(event) => {
        if (isPressKey(event.key)) {
          setIsPressed(false);
        }
      }}
      onPointerCancel={() => setIsPressed(false)}
      onPointerDown={() => setIsPressed(true)}
      onPointerLeave={() => setIsPressed(false)}
      onPointerUp={() => setIsPressed(false)}
      type="button"
    >
      <span className="press-escape__content">{children}</span>
    </button>
  );
}
