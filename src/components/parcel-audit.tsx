import * as React from "react";

interface ParcelAuditState {
  file: File | null;
  audited: number;
}

export interface ParcelAuditProps {
  label: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ParcelAudit({ label }: ParcelAuditProps) {
  const [state, setState] = React.useState<ParcelAuditState>({ file: null, audited: 0 });
  const [inputKey, setInputKey] = React.useState(0);
  const parcels = state.file ? Math.max(1, Math.min(5, Math.ceil(state.file.size / 20000))) : 0;
  const complete = parcels > 0 && state.audited === parcels;

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    setState({ file, audited: 0 });
  };

  const auditNext = () => {
    setState((current) => ({ ...current, audited: Math.min(parcels, current.audited + 1) }));
  };

  const reset = () => {
    setState({ file: null, audited: 0 });
    setInputKey((current) => current + 1);
  };

  return (
    <section aria-label={`${label} local file audit`} className="gra-ui parcel-audit" data-state={complete ? "complete" : state.file ? "auditing" : "empty"}>
      <header className="parcel-audit__header">
        <span>{label}</span>
        <output aria-live="polite">{state.file ? `${state.audited} / ${parcels} parcels` : "No parcel"}</output>
      </header>

      <label className="parcel-audit__drop">
        <span>{state.file ? "Replace the submitted parcel" : "Choose one local file to submit"}</span>
        <input key={inputKey} onChange={selectFile} type="file" />
      </label>

      <div className="parcel-audit__manifest" aria-live="polite">
        {state.file ? (
          <>
            <div className="parcel-audit__file">
              <strong>{state.file.name}</strong>
              <small>{formatBytes(state.file.size)} · {state.file.type || "unclassified"}</small>
            </div>
            <div className="parcel-audit__parcels" aria-label={`${parcels} audit parcels`}>
              {Array.from({ length: parcels }, (_, index) => (
                <span data-audited={index < state.audited} key={index}>{index + 1}</span>
              ))}
            </div>
          </>
        ) : (
          <p>Selecting a file creates an audit queue from its size. The queue is not legally meaningful.</p>
        )}
      </div>

      <footer className="parcel-audit__footer">
        <p aria-live="polite">
          {complete ? "Every parcel has been inspected. The file remains exactly the same." : state.file ? "Inspect each artificial parcel before releasing the file." : "A file cannot be released until it has been unnecessarily divided."}
        </p>
        <div className="parcel-audit__actions">
          <button disabled={!state.file || complete} onClick={auditNext} type="button">Audit next parcel</button>
          <button className="parcel-audit__reset" disabled={!state.file} onClick={reset} type="button">Clear audit</button>
        </div>
      </footer>
    </section>
  );
}
