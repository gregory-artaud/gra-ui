import * as React from "react";

const DIALECTS = [
  { id: "json", label: "Array JSON", detail: "words become a data list" },
  { id: "csv", label: "CSV", detail: "words become a spreadsheet row" },
  { id: "query", label: "Query string", detail: "words become repeated parameters" },
] as const;

type DataDialectId = (typeof DIALECTS)[number]["id"];

export interface DataDialectProps {
  label: string;
}

interface DataDialectState {
  dialect: DataDialectId | null;
  signature: string;
}

function wordsOf(label: string) {
  return label.trim().split(/\s+/).filter(Boolean);
}

function quoteCsv(word: string) {
  return `"${word.replaceAll('"', '""')}"`;
}

function serialize(label: string, dialect: DataDialectId) {
  const words = wordsOf(label);

  if (dialect === "json") {
    return JSON.stringify(words);
  }

  if (dialect === "csv") {
    return words.map(quoteCsv).join(",");
  }

  return words.map((word) => `word=${encodeURIComponent(word)}`).join("&");
}

function createState(signature: string): DataDialectState {
  return { dialect: null, signature };
}

export function DataDialect({ label }: DataDialectProps) {
  const [state, setState] = React.useState<DataDialectState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const selected = DIALECTS.find((dialect) => dialect.id === current.dialect);
  const display = current.dialect ? serialize(label, current.dialect) : label || "No words volunteered for serialization.";

  return (
    <section
      aria-label="Choose a data dialect for a readable label"
      className="gra-ui data-dialect"
      data-dialect={current.dialect ?? "plain"}
    >
      <header className="data-dialect__header">
        <span>Data dialect</span>
        <output aria-live="polite">{selected?.label ?? "Plain language"}</output>
      </header>

      <div className="data-dialect__paper" aria-live="polite">
        <span className="data-dialect__caption">Current payload</span>
        <pre><code key={current.dialect ?? "plain"}>{display}</code></pre>
      </div>

      <div className="data-dialect__choices" role="group" aria-label="Data dialect choices">
        {DIALECTS.map((dialect) => (
          <button
            aria-pressed={current.dialect === dialect.id}
            className="data-dialect__choice"
            data-selected={current.dialect === dialect.id}
            key={dialect.id}
            onClick={() => setState({ dialect: dialect.id, signature: label })}
            type="button"
          >
            <strong>{dialect.label}</strong>
            <small>{dialect.detail}</small>
          </button>
        ))}
      </div>

      <footer className="data-dialect__footer">
        <p aria-live="polite">
          {selected
            ? `The label now speaks ${selected.label} without gaining any data.`
            : "Choose a format to make a sentence pretend it is an interface contract."}
        </p>
        <button disabled={current.dialect === null} onClick={() => setState(createState(label))} type="button">
          Restore sentence
        </button>
      </footer>
    </section>
  );
}
