import { useState } from "react";
import type { ReactNode } from "react";

const stations = [
  { id: "borrow", label: "Borrow notice", hint: "remove it" },
  { id: "witness", label: "Add witness mark", hint: "mark it" },
  { id: "return", label: "Return notice", hint: "put it back" },
] as const;

export interface ReturnProtocolProps {
  children: ReactNode;
}

export function ReturnProtocol({ children }: ReturnProtocolProps) {
  const [stage, setStage] = useState(0);
  const complete = stage === stations.length;

  return (
    <section className="gra-ui return-protocol" data-stage={stage} data-complete={complete}>
      <header className="return-protocol__header">
        <span>Return protocol</span>
        <output aria-label={`${stage} of 3 actions completed`}>{stage}/3 actions</output>
      </header>

      <div className="return-protocol__stations" aria-label="Protocol stations">
        <div className="return-protocol__station return-protocol__station--home">
          <span>HOME</span>
          {stage === 0 || complete ? <div className="return-protocol__cargo">{children}</div> : <i>empty</i>}
          {complete ? <b aria-label="witness mark">✓</b> : null}
        </div>
        <div className="return-protocol__station return-protocol__station--loan">
          <span>LOAN TRAY</span>
          {stage > 0 && !complete ? <div className="return-protocol__cargo">{children}{stage > 1 ? <b aria-label="witness mark">✓</b> : null}</div> : <i>empty</i>}
        </div>
      </div>

      <p className="return-protocol__status" aria-live="polite">
        {complete ? "Returned with a witness mark nobody requested." : stations[stage].label + " is the only permitted next action."}
      </p>

      <nav className="return-protocol__actions" aria-label="Protocol actions">
        {stations.map((station, index) => (
          <button key={station.id} type="button" disabled={stage !== index} onClick={() => setStage(index + 1)}>
            <strong>{station.label}</strong>
            <small>{station.hint}</small>
          </button>
        ))}
      </nav>

      <button className="return-protocol__reset" type="button" onClick={() => setStage(0)} disabled={stage === 0}>
        Cancel protocol
      </button>
    </section>
  );
}
