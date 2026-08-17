import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";

const gestures = [
  { id: "stamp", label: "Stamp", hint: "single click" },
  { id: "turn", label: "Turn", hint: "double click" },
  { id: "seal", label: "Seal", hint: "right click" },
] as const;

type GestureId = (typeof gestures)[number]["id"];

interface GesturePatentState {
  stage: number;
  message: string;
}

export interface GesturePatentProps {
  children: ReactNode;
}

export function GesturePatent({ children }: GesturePatentProps) {
  const [state, setState] = useState<GesturePatentState>({ stage: 0, message: "The specimen has no patent yet." });

  const perform = (gesture: GestureId) => {
    const expected = gestures[state.stage];
    if (expected?.id !== gesture) {
      setState({ stage: 0, message: `That was filed out of order. Begin with ${gestures[0].label.toLowerCase()}.` });
      return;
    }

    const nextStage = state.stage + 1;
    setState({
      stage: nextStage,
      message: nextStage === gestures.length ? "Patent granted. The specimen remains the same." : `${expected.label} accepted. Perform the next gesture.`,
    });
  };

  const handleTurnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) perform("turn");
  };

  const handleSealClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) perform("seal");
  };

  return (
    <section className="gra-ui gesture-patent" data-stage={state.stage} data-granted={state.stage === gestures.length} aria-label="Gesture patent">
      <header className="gesture-patent__header">
        <span>Gesture patent</span>
        <output aria-live="polite">{state.stage}/3 accepted</output>
      </header>

      <div className="gesture-patent__specimen" aria-live="polite">
        <span className="gesture-patent__filing-mark">{state.stage === gestures.length ? "GRANTED" : "PENDING"}</span>
        <div>{children}</div>
      </div>

      <div className="gesture-patent__stations" role="group" aria-label="Perform the gestures in order">
        <button type="button" onClick={() => perform("stamp")} aria-pressed={state.stage > 0}>
          <b>1 · Stamp</b>
          <small>click once</small>
        </button>
        <button type="button" onDoubleClick={() => perform("turn")} onClick={handleTurnClick} aria-pressed={state.stage > 1}>
          <b>2 · Turn</b>
          <small>double-click</small>
        </button>
        <button type="button" onContextMenu={(event) => { event.preventDefault(); perform("seal"); }} onClick={handleSealClick} aria-pressed={state.stage > 2}>
          <b>3 · Seal</b>
          <small>right-click</small>
        </button>
      </div>

      <footer className="gesture-patent__footer">
        <span>{state.message}</span>
        <button type="button" onClick={() => setState({ stage: 0, message: "The specimen has no patent yet." })} disabled={state.stage === 0}>Withdraw patent</button>
      </footer>
    </section>
  );
}
