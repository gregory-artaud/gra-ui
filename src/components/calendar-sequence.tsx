import * as React from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;
const DAYS = Array.from({ length: 28 }, (_, index) => index + 1);
const YEARS = [2026, 2027, 2028, 2029] as const;

type CalendarSequenceState = {
  day: number | null;
  month: number | null;
  phase: "month" | "day" | "year" | "complete";
  year: number | null;
};

export type CalendarSequenceProps = Record<string, never>;

const INITIAL_STATE: CalendarSequenceState = { day: null, month: null, phase: "month", year: null };

function selectMonth(month: number): CalendarSequenceState {
  return { day: null, month, phase: "day", year: null };
}

export function CalendarSequence() {
  const [state, setState] = React.useState<CalendarSequenceState>(INITIAL_STATE);
  const complete = state.phase === "complete";
  const dateLabel = complete && state.month && state.day && state.year
    ? `${MONTHS[state.month - 1]} ${state.day}, ${state.year}`
    : "No date has survived the sequence";

  return (
    <section
      aria-label="Choose a date only in month, day, year order"
      className="gra-ui calendar-sequence"
      data-phase={state.phase}
    >
      <header className="calendar-sequence__header">
        <span>Calendar sequence</span>
        <output aria-live="polite">{complete ? "Filed" : `Step ${state.phase === "month" ? 1 : state.phase === "day" ? 2 : 3} / 3`}</output>
      </header>

      <div className="calendar-sequence__date" aria-live="polite">
        <span className="calendar-sequence__date-mark" aria-hidden="true">∷</span>
        <strong>{dateLabel}</strong>
        <small>{complete ? "The order was accepted. The date was always available." : "A date waits for its ceremonial order."}</small>
      </div>

      <div className="calendar-sequence__fields">
        <label data-current={state.phase === "month"}>
          <span>01 / Month</span>
          <select
            aria-label="Choose month first"
            value={state.month ?? ""}
            onChange={(event) => setState(selectMonth(Number(event.target.value)))}
          >
            <option disabled value="">Choose month</option>
            {MONTHS.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
          </select>
        </label>
        <label data-current={state.phase === "day"}>
          <span>02 / Day</span>
          <select
            aria-label="Choose day second"
            disabled={state.month === null}
            value={state.day ?? ""}
            onChange={(event) => setState({ day: Number(event.target.value), month: state.month, phase: "year", year: null })}
          >
            <option disabled value="">Choose day</option>
            {DAYS.map((day) => <option key={day} value={day}>{day}</option>)}
          </select>
        </label>
        <label data-current={state.phase === "year"}>
          <span>03 / Year</span>
          <select
            aria-label="Choose year third"
            disabled={state.day === null}
            value={state.year ?? ""}
            onChange={(event) => setState({ ...state, phase: "complete", year: Number(event.target.value) })}
          >
            <option disabled value="">Choose year</option>
            {YEARS.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </label>
      </div>

      <footer className="calendar-sequence__footer">
        <p aria-live="polite">
          {complete ? "Sequence complete. Calendar software may resume its ordinary duties." : `Next: ${state.phase === "month" ? "choose a month" : state.phase === "day" ? "choose a day" : "choose a year"}.`}
        </p>
        <button disabled={state.phase === "month"} onClick={() => setState(INITIAL_STATE)} type="button">
          Reset order
        </button>
      </footer>
    </section>
  );
}
