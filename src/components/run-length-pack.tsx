import { useState } from "react";

interface CharacterRun {
  character: string;
  count: number;
}

const packRuns = (label: string): CharacterRun[] => {
  const characters = Array.from(label);
  const runs: CharacterRun[] = [];

  for (const character of characters) {
    const last = runs[runs.length - 1];
    if (last?.character === character) last.count += 1;
    else runs.push({ character, count: 1 });
  }

  return runs;
};

export interface RunLengthPackProps {
  label: string;
}

export function RunLengthPack({ label }: RunLengthPackProps) {
  const [packed, setPacked] = useState(false);
  const runs = packRuns(label);
  const savings = Array.from(label).length - runs.length;

  return (
    <section className="gra-ui run-length-pack" data-packed={packed} aria-label="Run length pack">
      <header className="run-length-pack__header">
        <span>Run-length pack</span>
        <output aria-live="polite">{packed ? `${savings} repeated glyphs packed` : "Original sequence"}</output>
      </header>

      <div className="run-length-pack__paper">
        {packed ? (
          <div className="run-length-pack__runs" aria-label="Packed character runs">
            {runs.map((run, index) => (
              <span className="run-length-pack__run" key={`${run.character}-${index}`}>
                <b>{run.character === " " ? "␠" : run.character}</b>
                {run.count > 1 ? <sup>×{run.count}</sup> : null}
              </span>
            ))}
          </div>
        ) : (
          <p aria-live="polite">{label || "∅"}</p>
        )}
        <small>{packed ? "Adjacent glyphs now travel as one crate." : "Repeated neighbors are waiting to be compressed."}</small>
      </div>

      <footer className="run-length-pack__footer">
        <span>{packed ? "The sentence is shorter to store, not to understand." : `${Array.from(label).length} glyphs in the intake.`}</span>
        <button type="button" onClick={() => setPacked((current) => !current)}>
          {packed ? "Unpack sequence" : "Pack adjacent runs"}
        </button>
      </footer>
    </section>
  );
}
