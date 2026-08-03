import * as React from "react";

import { Button, type ButtonProps } from "./ui/button";

const DEFAULT_CHOICES = ["Maybe", "Actually...", "Let's do it"] as const;
const DEFAULT_INTERVAL = 900;
const MINIMUM_INTERVAL = 150;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return typeof window !== "undefined" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export interface IndecisiveButtonProps
  extends Omit<ButtonProps, "asChild" | "children"> {
  children: React.ReactNode;
  choices?: readonly string[];
  interval?: number;
  onDecision?: (
    choice: string,
    index: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const IndecisiveButton = React.forwardRef<
  HTMLButtonElement,
  IndecisiveButtonProps
>(
  (
    {
      children,
      choices = DEFAULT_CHOICES,
      disabled,
      interval = DEFAULT_INTERVAL,
      onBlur,
      onClick,
      onDecision,
      onFocus,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [choiceIndex, setChoiceIndex] = React.useState(0);
    const prefersReducedMotion = React.useSyncExternalStore(
      subscribeToReducedMotion,
      getReducedMotionSnapshot,
      getServerReducedMotionSnapshot,
    );
    const isActive = !disabled && (isFocused || isHovered);
    const normalizedInterval =
      Number.isFinite(interval) && interval >= MINIMUM_INTERVAL
        ? interval
        : DEFAULT_INTERVAL;

    React.useEffect(() => {
      if (!isActive || prefersReducedMotion || choices.length < 2) {
        return;
      }

      const timer = window.setInterval(() => {
        setChoiceIndex((currentIndex) =>
          currentIndex + 1 >= choices.length ? 0 : currentIndex + 1,
        );
      }, normalizedInterval);

      return () => window.clearInterval(timer);
    }, [choices.length, isActive, normalizedInterval, prefersReducedMotion]);

    const visibleChoice = isActive ? choices[choiceIndex] : undefined;

    return (
      <Button
        disabled={disabled}
        onBlur={(event) => {
          setIsFocused(false);
          setChoiceIndex(0);
          onBlur?.(event);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && visibleChoice !== undefined) {
            onDecision?.(visibleChoice, choiceIndex, event);
          }
        }}
        onFocus={(event) => {
          if (!isHovered) {
            setChoiceIndex(0);
          }
          setIsFocused(true);
          onFocus?.(event);
        }}
        onPointerEnter={(event) => {
          setChoiceIndex(0);
          setIsHovered(true);
          onPointerEnter?.(event);
        }}
        onPointerLeave={(event) => {
          setIsHovered(false);
          if (!isFocused) {
            setChoiceIndex(0);
          }
          onPointerLeave?.(event);
        }}
        ref={ref}
        {...props}
      >
        {visibleChoice ?? children}
      </Button>
    );
  },
);
IndecisiveButton.displayName = "IndecisiveButton";

export { IndecisiveButton };
