import * as React from "react";

type Format = "ledger" | "column" | "ribbon";

const FORMATS: readonly { id: Format; label: string; detail: string }[] = [
  { id: "ledger", label: "Ledger", detail: "one word per numbered entry" },
  { id: "column", label: "Column", detail: "one word per table cell" },
  { id: "ribbon", label: "Ribbon", detail: "words kept in one flowing strip" },
];

export interface FormatForkProps {
  label: string;
}

function wordsOf(label: string) {
  return label.trim().split(/\s+/).filter(Boolean);
}

export function FormatFork({ label }: FormatForkProps) {
  const [format, setFormat] = React.useState<Format>("ledger");
  const words = wordsOf(label);
  const selected = FORMATS.find((option) => option.id === format) ?? FORMATS[0];

  return (
    <section aria-label="Choose a filing format for a label" className="gra-ui format-fork" data-format={format}>
      <header className="format-fork__header">
        <span>Format fork</span>
        <output aria-live="polite">{selected.label}</output>
      </header>

      <div className="format-fork__stage" aria-live="polite">
        <span className="format-fork__caption">Current filing</span>
        <div className="format-fork__render" key={format}>
          {format === "ledger" ? (
            <ol>{words.map((word, index) => <li key={`${word}-${index}`}>{word}</li>)}</ol>
          ) : null}
          {format === "column" ? (
            <table><tbody><tr>{words.map((word, index) => <td key={`${word}-${index}`}>{word}</td>)}</tr></tbody></table>
          ) : null}
          {format === "ribbon" ? (
            <p>{words.map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}</p>
          ) : null}
          {words.length === 0 ? <p className="format-fork__empty">No words volunteered for filing.</p> : null}
        </div>
      </div>

      <label className="format-fork__select">
        <span>Choose a destination</span>
        <select aria-label="Filing destination" onChange={(event) => setFormat(event.currentTarget.value as Format)} value={format}>
          {FORMATS.map((option) => <option key={option.id} value={option.id}>{option.label} · {option.detail}</option>)}
        </select>
      </label>

      <p className="format-fork__note" aria-live="polite">The words are unchanged, but their actual HTML container now claims a different authority.</p>
    </section>
  );
}
