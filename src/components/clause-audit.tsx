import * as React from "react";

export interface ClauseAuditProps {
  label: string;
}

interface ClauseAuditState {
  audited: number;
  signature: string;
}

function createState(signature: string): ClauseAuditState {
  return { audited: 0, signature };
}

export function ClauseAudit({ label }: ClauseAuditProps) {
  const clauses = label.trim() === "" ? [] : label.trim().split(/\s+/u);
  const [state, setState] = React.useState<ClauseAuditState>(() => createState(label));
  const current = state.signature === label ? state : createState(label);
  const complete = current.audited === clauses.length && clauses.length > 0;

  return (
    <section
      aria-label="Audit a label one word at a time"
      className="gra-ui clause-audit"
      data-state={complete ? "complete" : current.audited > 0 ? "auditing" : "ready"}
    >
      <header className="clause-audit__header">
        <span>Clause audit</span>
        <output aria-live="polite">{current.audited} / {clauses.length} examined</output>
      </header>

      <div className="clause-audit__paper">
        <p aria-live="polite">
          {clauses.map((clause, index) => (
            <span
              className="clause-audit__clause"
              data-audited={index < current.audited ? "true" : "false"}
              key={`${label}-${index}`}
            >
              {clause}
            </span>
          ))}
        </p>
        <progress aria-label="Audit progress" max={clauses.length || 1} value={current.audited} />
      </div>

      <div className="clause-audit__footer">
        <p aria-live="polite">
          {complete
            ? "Every word has received its completely unnecessary inspection stamp."
            : current.audited === 0
              ? "Begin the audit to give each word its own administrative moment."
              : `Word ${current.audited + 1} is waiting for a ruling.`}
        </p>
        <div className="clause-audit__actions">
          <button
            disabled={complete || clauses.length === 0}
            onClick={() => setState({ audited: Math.min(current.audited + 1, clauses.length), signature: label })}
            type="button"
          >
            Audit next word
          </button>
          <button
            className="clause-audit__reset"
            disabled={current.audited === 0}
            onClick={() => setState(createState(label))}
            type="button"
          >
            Clear audit
          </button>
        </div>
      </div>
    </section>
  );
}
