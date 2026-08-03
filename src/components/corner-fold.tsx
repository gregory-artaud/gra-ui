import * as React from "react";

export interface CornerFoldProps {
  children: React.ReactNode;
}

const CORNERS = ["top-left", "top-right", "bottom-right", "bottom-left"] as const;
const ALL_CORNERS = (1 << CORNERS.length) - 1;

type Corner = (typeof CORNERS)[number];

function cornerBit(corner: Corner) {
  return 1 << CORNERS.indexOf(corner);
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function CornerFold({ children }: CornerFoldProps) {
  const [visited, setVisited] = React.useState(0);
  const visitedCount = CORNERS.filter((corner) => visited & cornerBit(corner)).length;
  const isFolded = visited === ALL_CORNERS;

  const visitCorner = (corner: Corner) => {
    if (isFolded) {
      return;
    }

    setVisited((currentVisited) => currentVisited | cornerBit(corner));
  };

  return (
    <section
      aria-label={
        isFolded
          ? "All corners visited. The content is folded."
          : "Visit every corner to fold the content"
      }
      className="gra-ui corner-fold"
      data-state={isFolded ? "folded" : "open"}
      data-visited={visitedCount}
    >
      <div className="corner-fold__stage">
        <div className="corner-fold__content">{children}</div>

        {!isFolded ? (
          CORNERS.map((corner) => {
            const isVisited = Boolean(visited & cornerBit(corner));

            return (
              <button
                aria-label={`Visit the ${corner.replace("-", " ")} corner`}
                aria-pressed={isVisited}
                className="corner-fold__corner"
                data-corner={corner}
                data-visited={isVisited ? "true" : "false"}
                key={corner}
                onFocus={() => visitCorner(corner)}
                onKeyDown={(event) => {
                  if (isActivationKey(event.key)) {
                    event.preventDefault();
                    visitCorner(corner);
                  }
                }}
                onPointerEnter={() => visitCorner(corner)}
                type="button"
              >
                <span aria-hidden="true" />
              </button>
            );
          })
        ) : (
          <button
            className="corner-fold__reset"
            onClick={() => setVisited(0)}
            type="button"
          >
            Unfold and start again
          </button>
        )}
      </div>

      <div className="corner-fold__footer">
        <span aria-live="polite">
          {isFolded ? "Folded" : `${visitedCount} / ${CORNERS.length} corners visited`}
        </span>
        <span aria-hidden="true" className="corner-fold__meter">
          {CORNERS.map((corner) => (
            <span
              data-filled={visited & cornerBit(corner) ? "true" : "false"}
              key={corner}
            />
          ))}
        </span>
      </div>
    </section>
  );
}
