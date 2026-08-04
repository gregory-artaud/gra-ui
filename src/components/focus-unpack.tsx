import * as React from "react";

export interface FocusUnpackProps {
  children: React.ReactNode;
}

export function FocusUnpack({ children }: FocusUnpackProps) {
  const items = React.Children.toArray(children);
  const [unpacked, setUnpacked] = React.useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setUnpacked(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    setUnpacked((current) => !current);
  };

  return (
    <div className="gra-ui focus-unpack" data-state={unpacked ? "unpacked" : "packed"}>
      <div className="focus-unpack__stage">
        <div
          aria-expanded={unpacked}
          className="focus-unpack__bundle"
          role="button"
          tabIndex={0}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        >
          {unpacked ? (
            items.map((item, index) => (
              <div className="focus-unpack__item" key={index}>
                {item}
              </div>
            ))
          ) : (
            <div className="focus-unpack__item focus-unpack__item--bundle">
              {items}
            </div>
          )}
        </div>
      </div>
      <p className="focus-unpack__status" aria-live="polite">
        {unpacked ? `${items.length} children exposed` : "Focus to separate the children"}
      </p>
    </div>
  );
}
