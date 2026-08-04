import * as React from "react";

export interface WeekdayLedgerProps {
  children: React.ReactNode;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function weekdayFromDate(value: string) {
  const parts = value.split("-").map(Number);

  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part))) {
    return null;
  }

  const [year, month, day] = parts;
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return parsed.getUTCDay();
}

export function WeekdayLedger({ children }: WeekdayLedgerProps) {
  const [draftDate, setDraftDate] = React.useState("");
  const [filedDate, setFiledDate] = React.useState("");
  const items = React.Children.toArray(children);
  const startDay = weekdayFromDate(filedDate);
  const dayBuckets = WEEKDAYS.map((label, index) => ({
    index,
    items: [] as React.ReactNode[],
    label,
  }));

  if (startDay !== null) {
    items.forEach((item, index) => {
      dayBuckets[(startDay + index) % WEEKDAYS.length].items.push(item);
    });
  }

  const isFiled = startDay !== null;

  return (
    <section className="gra-ui weekday-ledger" data-filed={isFiled ? "true" : "false"}>
      <header className="weekday-ledger__header">
        <span>Weekday ledger</span>
        <output>{isFiled ? `Starts ${WEEKDAYS[startDay]}` : "Unfiled"}</output>
      </header>

      <div className="weekday-ledger__board">
        {isFiled ? (
          <div aria-live="polite" className="weekday-ledger__grid">
            {dayBuckets.map((day) => (
              <div className="weekday-ledger__day" data-filled={day.items.length > 0} key={day.label}>
                <span className="weekday-ledger__day-label">{day.label}</span>
                <div className="weekday-ledger__slots">
                  {day.items.map((item, index) => (
                    <div className="weekday-ledger__item" key={`${day.index}-${index}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div aria-live="polite" className="weekday-ledger__waiting">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div className="weekday-ledger__waiting-item" key={index}>
                  {item}
                </div>
              ))
            ) : (
              <span className="weekday-ledger__empty">Nothing is waiting to be filed.</span>
            )}
          </div>
        )}
      </div>

      <form
        className="weekday-ledger__form"
        onSubmit={(event) => {
          event.preventDefault();
          setFiledDate(draftDate);
        }}
      >
        <label className="weekday-ledger__date-label">
          <span>Starting date</span>
          <input
            aria-label="Starting date"
            onChange={(event) => setDraftDate(event.target.value)}
            required
            type="date"
            value={draftDate}
          />
        </label>
        <button disabled={!draftDate} type="submit">
          File the week
        </button>
      </form>

      {isFiled ? (
        <button
          className="weekday-ledger__reset"
          onClick={() => {
            setDraftDate("");
            setFiledDate("");
          }}
          type="button"
        >
          Clear the ledger
        </button>
      ) : null}

      <p className="weekday-ledger__status">
        {isFiled
          ? "Each label now occupies the next weekday, beginning with the date you filed."
          : "Choose a date and file the labels into a week that did not ask for them."}
      </p>
    </section>
  );
}
