import * as React from "react";

const CALIBRATION_STEPS = 4;

export interface CalibrationWindowProps {
  children: React.ReactNode;
}

interface CalibrationWindowState {
  level: number;
  signature: string;
}

function signatureForChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return `${index}:${String(element.key)}:${String(element.type)}:${String(element.props.children ?? "")}`;
      }

      return `${index}:${typeof child}:${String(child)}`;
    })
    .join("|");
}

function createState(signature: string): CalibrationWindowState {
  return { level: 0, signature };
}

export function CalibrationWindow({ children }: CalibrationWindowProps) {
  const signature = signatureForChildren(children);
  const [state, setState] = React.useState<CalibrationWindowState>(() => createState(signature));
  const current = state.signature === signature ? state : createState(signature);
  const isCalibrated = current.level === CALIBRATION_STEPS;

  return (
    <section
      aria-label="Calibrate a notice through four increasingly narrow windows"
      className="gra-ui calibration-window"
      data-level={current.level}
      data-state={isCalibrated ? "calibrated" : current.level === 0 ? "ready" : "calibrating"}
    >
      <header className="calibration-window__header">
        <span>Window calibration</span>
        <output aria-live="polite">{current.level} / {CALIBRATION_STEPS}</output>
      </header>

      <div className="calibration-window__stage">
        <div className="calibration-window__ruler" aria-hidden="true">
          {Array.from({ length: CALIBRATION_STEPS + 1 }, (_, index) => (
            <span data-lit={index <= current.level} key={index}>{index}</span>
          ))}
        </div>
        <div className="calibration-window__aperture">
          <div className="calibration-window__cargo">{children}</div>
        </div>
      </div>

      <progress max={CALIBRATION_STEPS} value={current.level} aria-label="Calibration progress" />

      <footer className="calibration-window__footer">
        <p aria-live="polite">
          {isCalibrated
            ? "The notice now fits a window that was never necessary."
            : current.level === 0
              ? "Give the window one calibration notch."
              : `${current.level} notch${current.level === 1 ? "" : "es"} recorded. The aperture is less helpful now.`}
        </p>
        <div className="calibration-window__actions">
          <button disabled={isCalibrated} onClick={() => setState({ level: current.level + 1, signature })} type="button">
            {isCalibrated ? "Fully calibrated" : "Calibrate one notch"}
          </button>
          <button
            className="calibration-window__reset"
            disabled={current.level === 0}
            onClick={() => setState(createState(signature))}
            type="button"
          >
            Open it again
          </button>
        </div>
      </footer>
    </section>
  );
}
