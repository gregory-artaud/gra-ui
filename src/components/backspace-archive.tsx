import * as React from "react";

export interface BackspaceArchiveProps {
  label: string;
}

interface BackspaceArchiveState {
  signature: string;
  value: string;
  archived: string[];
}

function createState(label: string): BackspaceArchiveState {
  return { signature: label, value: label, archived: [] };
}

function previousCharacterStart(value: string, position: number) {
  const beforeCursor = value.slice(0, position);
  const character = Array.from(beforeCursor).at(-1);

  return position - (character?.length ?? 0);
}

export function BackspaceArchive({ label }: BackspaceArchiveProps) {
  const [state, setState] = React.useState<BackspaceArchiveState>(() =>
    createState(label),
  );
  const visibleState = state.signature === label ? state : createState(label);
  const isEmpty = visibleState.value.length === 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace") {
      return;
    }

    const input = event.currentTarget;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? start;

    if (start === 0 && start === end) {
      return;
    }

    event.preventDefault();
    setState((currentState) => {
      const current = currentState.signature === label
        ? currentState
        : createState(label);
      const deleteStart = start === end
        ? previousCharacterStart(current.value, start)
        : start;
      const removed = current.value.slice(deleteStart, end);

      if (!removed) {
        return currentState;
      }

      return {
        signature: label,
        value: `${current.value.slice(0, deleteStart)}${current.value.slice(end)}`,
        archived: [...current.archived, ...Array.from(removed)],
      };
    });
  };

  return (
    <section
      aria-label={`${label} backspace archive`}
      className="gra-ui backspace-archive"
      data-count={visibleState.archived.length}
      data-state={isEmpty ? "empty" : visibleState.archived.length > 0 ? "archiving" : "ready"}
    >
      <div className="backspace-archive__header">
        <span className="backspace-archive__label">{label}</span>
        <output aria-live="polite" className="backspace-archive__count">
          {visibleState.archived.length} archived
        </output>
      </div>

      <input
        aria-label="Editable text"
        className="backspace-archive__input"
        onChange={(event) => {
          const value = event.currentTarget.value;
          setState((currentState) => {
            const current = currentState.signature === label
              ? currentState
              : createState(label);

            return current.value === value
              ? currentState
              : { ...current, value, signature: label };
          });
        }}
        onKeyDown={handleKeyDown}
        type="text"
        value={visibleState.value}
      />

      <div className="backspace-archive__tray" aria-live="polite">
        {visibleState.archived.length > 0 ? (
          <ol className="backspace-archive__archive" aria-label="Archived characters">
            {visibleState.archived.map((character, index) => (
              <li className="backspace-archive__character" key={`${index}-${character}`}>
                {character === " " ? "·" : character}
              </li>
            ))}
          </ol>
        ) : (
          <span className="backspace-archive__empty">Backspace to collect characters</span>
        )}
      </div>

      <button
        className="backspace-archive__reset"
        onClick={() => setState(createState(label))}
        type="button"
      >
        Restore text
      </button>
    </section>
  );
}
