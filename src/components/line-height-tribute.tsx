import * as React from "react";

const MAX_STAGE = 4;

export interface LineHeightTributeProps {
  children: React.ReactNode;
}

export function LineHeightTribute({ children }: LineHeightTributeProps) {
  const [stage, setStage] = React.useState(0);
  const complete = stage === MAX_STAGE;

  return (
    <section
      aria-label="Pay a tribute in line height"
      className="gra-ui line-height-tribute"
      data-complete={complete}
      data-stage={stage}
    >
      <header className="line-height-tribute__header">
        <span>Line-height tribute</span>
        <output aria-live="polite">{complete ? "Fully spaced" : `${stage} / ${MAX_STAGE} payments`}</output>
      </header>

      <div className="line-height-tribute__paper" aria-live="polite">
        <span className="line-height-tribute__caption">The notice must pay for every line</span>
        <div className="line-height-tribute__content">{children}</div>
      </div>

      <progress aria-label="Line-height payments" max={MAX_STAGE} value={stage} />

      <footer className="line-height-tribute__footer">
        <p>{complete ? "The wording now has an unnecessarily generous vertical budget." : "Increase the distance between lines until the notice feels overfunded."}</p>
        <div className="line-height-tribute__actions">
          <button disabled={complete} onClick={() => setStage((value) => Math.min(MAX_STAGE, value + 1))} type="button">
            Pay one line
          </button>
          <button className="line-height-tribute__reset" disabled={stage === 0} onClick={() => setStage(0)} type="button">
            Reclaim spacing
          </button>
        </div>
      </footer>
    </section>
  );
}
