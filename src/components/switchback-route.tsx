import { useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

const route = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"] as const;
const routeSymbols = ["↑", "→", "↓", "←"] as const;

type RouteState = { position: number; errors: number };

export interface SwitchbackRouteProps {
  children: ReactNode;
}

export function SwitchbackRoute({ children }: SwitchbackRouteProps) {
  const [state, setState] = useState<RouteState>({ position: 0, errors: 0 });
  const complete = state.position === route.length;

  const followRoute = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!route.includes(event.key as (typeof route)[number])) return;

    event.preventDefault();
    setState((current) => {
      if (event.key === route[current.position]) {
        return { ...current, position: current.position + 1 };
      }

      return { position: 0, errors: current.errors + 1 };
    });
  };

  return (
    <section className="gra-ui switchback-route" data-complete={complete}>
      <header className="switchback-route__header">
        <span>Switchback route</span>
        <output aria-label={`${state.position} of 4 turns completed`}>
          {state.position}/4 turns
        </output>
      </header>

      <div
        className="switchback-route__board"
        role="group"
        tabIndex={0}
        aria-label="Route keyboard"
        onKeyDown={followRoute}
      >
        <ol>
          {routeSymbols.map((symbol, index) => (
            <li key={symbol} data-passed={index < state.position} data-current={index === state.position}>
              <kbd>{symbol}</kbd>
              <span>{route[index].replace("Arrow", "")}</span>
            </li>
          ))}
        </ol>
        <div className="switchback-route__cargo">{children}</div>
      </div>

      <p className="switchback-route__status" aria-live="polite">
        {complete
          ? "The cargo has taken the long way around."
          : state.errors
            ? "Wrong turn. The route has returned to the entrance."
            : "Focus the route, then follow the arrows in order."}
      </p>

      <button
        type="button"
        className="switchback-route__reset"
        onClick={() => setState({ position: 0, errors: 0 })}
        disabled={state.position === 0 && state.errors === 0}
      >
        Start over
      </button>
    </section>
  );
}
