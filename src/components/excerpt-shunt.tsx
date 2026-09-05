import * as React from "react";

interface TextSelection {
  start: number;
  end: number;
}

interface ExcerptShuntState {
  label: string;
  selection: TextSelection | null;
  shunted: boolean;
}

export interface ExcerptShuntProps {
  label: string;
}

function createState(label: string): ExcerptShuntState {
  return { label, selection: null, shunted: false };
}

export function ExcerptShunt({ label }: ExcerptShuntProps) {
  const textRef = React.useRef<HTMLParagraphElement>(null);
  const [state, setState] = React.useState<ExcerptShuntState>(() => createState(label));
  const current = state.label === label ? state : createState(label);
  const selection = current.selection;
  const excerpt = selection ? label.slice(selection.start, selection.end) : "";
  const remainder = selection
    ? `${label.slice(0, selection.start)}${label.slice(selection.end)}`
    : label;

  const captureSelection = () => {
    const container = textRef.current;
    const browserSelection = window.getSelection();

    if (!container || !browserSelection || browserSelection.rangeCount === 0 || browserSelection.isCollapsed) {
      return;
    }

    const range = browserSelection.getRangeAt(0);
    if (!container.contains(range.commonAncestorContainer)) {
      return;
    }

    const before = range.cloneRange();
    before.selectNodeContents(container);
    before.setEnd(range.startContainer, range.startOffset);
    const start = before.toString().length;
    const selectedText = browserSelection.toString();
    const end = start + selectedText.length;

    if (selectedText.trim().length > 0 && end <= label.length) {
      setState({ label, selection: { start, end }, shunted: false });
    }
  };

  const canShunt = selection !== null && excerpt.trim().length > 0 && !current.shunted;

  return (
    <section
      aria-label="Select and shunt an excerpt"
      className="gra-ui excerpt-shunt"
      data-state={current.shunted ? "shunted" : selection ? "selected" : "waiting"}
    >
      <header className="excerpt-shunt__header">
        <span>Excerpt shunt</span>
        <output aria-live="polite">{current.shunted ? "Filed" : selection ? "Selected" : "Waiting"}</output>
      </header>

      {!current.shunted ? (
        <p
          className="excerpt-shunt__source"
          onKeyUp={captureSelection}
          onMouseUp={captureSelection}
          onSelect={captureSelection}
          ref={textRef}
          tabIndex={0}
        >
          {label || "Select a small excerpt from this empty-looking notice."}
        </p>
      ) : (
        <div className="excerpt-shunt__result" aria-live="polite">
          <p>{remainder || "(nothing remains in the source)"}</p>
          <aside>
            <span>Shunted excerpt</span>
            <strong>{excerpt}</strong>
          </aside>
        </div>
      )}

      <footer className="excerpt-shunt__footer">
        <p aria-live="polite">
          {current.shunted
            ? "The selected wording has left its sentence and now occupies a separate filing tray."
            : selection
              ? `“${excerpt}” is ready to leave the sentence.`
              : "Select a contiguous phrase with the pointer or keyboard, then move it aside."}
        </p>
        <div className="excerpt-shunt__actions">
          <button disabled={!canShunt} onClick={() => setState({ ...current, shunted: true })} type="button">
            Shunt excerpt
          </button>
          <button
            className="excerpt-shunt__reset"
            disabled={!selection && !current.shunted}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Restore sentence
          </button>
        </div>
      </footer>
    </section>
  );
}
