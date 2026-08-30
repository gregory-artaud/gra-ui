import * as React from "react";

const MAX_STAGE = 3;

export interface PartitionRiteProps {
  children: React.ReactNode;
}

export function PartitionRite({ children }: PartitionRiteProps) {
  const [stage, setStage] = React.useState(0);
  const partitionCount = 2 ** stage;
  const occupiedIndex = Math.max(0, partitionCount - 1);
  const complete = stage === MAX_STAGE;

  return (
    <section
      aria-label="Partition the content into ceremonial sections"
      className="gra-ui partition-rite"
      data-complete={complete}
      data-stage={stage}
    >
      <header className="partition-rite__header">
        <span>Partition rite</span>
        <output aria-live="polite">{complete ? "Fully partitioned" : `${stage} / ${MAX_STAGE} divisions`}</output>
      </header>

      <div
        aria-live="polite"
        className="partition-rite__grid"
        key={stage}
        style={{ "--partition-count": partitionCount } as React.CSSProperties}
      >
        {Array.from({ length: partitionCount }, (_, index) => (
          <div className="partition-rite__cell" data-occupied={index === occupiedIndex} key={index}>
            {index === occupiedIndex ? <div className="partition-rite__content">{children}</div> : <span aria-hidden="true" />}
          </div>
        ))}
      </div>

      <progress aria-label="Partition progress" max={MAX_STAGE} value={stage} />

      <footer className="partition-rite__footer">
        <p>{complete ? "The notice occupies one tiny province of its own." : "Bisect a perfectly adequate notice one more time."}</p>
        <div className="partition-rite__actions">
          <button disabled={complete} onClick={() => setStage((value) => Math.min(MAX_STAGE, value + 1))} type="button">
            Bisect again
          </button>
          <button className="partition-rite__reset" disabled={stage === 0} onClick={() => setStage(0)} type="button">
            Reunite sections
          </button>
        </div>
      </footer>
    </section>
  );
}
