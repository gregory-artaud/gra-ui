import * as React from "react";

export interface CaretSplitProps {
  label: string;
}

export function CaretSplit({ label }: CaretSplitProps) {
  const [splitState, setSplitState] = React.useState({ label, position: 0 });
  const position = splitState.label === label ? splitState.position : 0;
  const words = label.trim() ? label.trim().split(/\s+/) : [];
  const safePosition = Math.min(position, words.length);
  const left = words.slice(0, safePosition).join(" ");
  const right = words.slice(safePosition).join(" ");

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = bounds.width === 0 ? 0 : (event.clientX - bounds.left) / bounds.width;
    setSplitState({ label, position: Math.round(Math.max(0, Math.min(1, ratio)) * words.length) });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromPointer(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSplitState((current) => ({ label, position: Math.max(0, (current.label === label ? current.position : 0) - 1) }));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setSplitState((current) => ({ label, position: Math.min(words.length, (current.label === label ? current.position : 0) + 1) }));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setSplitState({ label, position: 0 });
    }
    if (event.key === "End") {
      event.preventDefault();
      setSplitState({ label, position: words.length });
    }
  };

  return (
    <section aria-label="Split a caption with a movable caret" className="gra-ui caret-split">
      <header className="caret-split__header">
        <span>Caret split</span>
        <output aria-live="polite">{safePosition} / {words.length} words</output>
      </header>

      <div
        aria-label="Move the split between words"
        aria-valuemax={words.length}
        aria-valuemin={0}
        aria-valuenow={safePosition}
        aria-valuetext={`${safePosition} words before the split`}
        className="caret-split__rail"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        role="slider"
        tabIndex={0}
      >
        <span className="caret-split__track" />
        <span className="caret-split__handle" style={{ left: `${words.length === 0 ? 50 : (safePosition / words.length) * 100}%` }} />
        <span className="caret-split__hint">drag the caret across the sentence</span>
      </div>

      <div className="caret-split__result" aria-live="polite">
        <div className="caret-split__half" data-empty={!left}>
          <span>Before</span>
          <strong>{left || "—"}</strong>
        </div>
        <div className="caret-split__half" data-empty={!right}>
          <span>After</span>
          <strong>{right || "—"}</strong>
        </div>
      </div>

      <footer className="caret-split__footer">
        <p>The caption is now two real pieces because a caret demanded a border.</p>
        <button className="caret-split__reset" disabled={safePosition === 0} onClick={() => setSplitState({ label, position: 0 })} type="button">Return to start</button>
      </footer>
    </section>
  );
}
