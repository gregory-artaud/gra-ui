import * as React from "react";

export interface PairwiseMergeProps {
  children: React.ReactNode;
}

type PairwiseMergeState = {
  groups: number[][];
  selected: number | null;
  merged: number | null;
};

function groupsFor(count: number) {
  return Array.from({ length: count }, (_, index) => [index]);
}

function hasCurrentGroups(groups: number[][], count: number) {
  const indexes = groups.flat();

  return (
    indexes.length === count &&
    new Set(indexes).size === count &&
    indexes.every((index) => index >= 0 && index < count)
  );
}

function isActivationKey(key: string) {
  return key === "Enter" || key === " ";
}

export function PairwiseMerge({ children }: PairwiseMergeProps) {
  const pieces = React.Children.toArray(children);
  const initialGroups = groupsFor(pieces.length);
  const [state, setState] = React.useState<PairwiseMergeState>(() => ({
    groups: initialGroups,
    selected: null,
    merged: null,
  }));
  const hasValidState = hasCurrentGroups(state.groups, pieces.length);
  const groups = hasValidState ? state.groups : initialGroups;
  const selected = hasValidState ? state.selected : null;
  const merged = hasValidState ? state.merged : null;
  const isComplete = groups.length <= 1;

  const chooseGroup = (groupIndex: number) => {
    if (isComplete) {
      return;
    }

    if (selected === null) {
      setState({ groups, selected: groupIndex, merged: null });
      return;
    }

    if (selected === groupIndex) {
      setState({ groups, selected: null, merged: null });
      return;
    }

    const first = Math.min(selected, groupIndex);
    const second = Math.max(selected, groupIndex);
    const nextGroups = groups
      .map((group, index) =>
        index === first ? [...group, ...groups[second]] : group,
      )
      .filter((_, index) => index !== second);

    setState({ groups: nextGroups, selected: null, merged: first });
  };

  return (
    <section
      aria-label={
        isComplete
          ? "All groups merged. Reset to separate them again."
          : "Double-click two groups to merge them"
      }
      className="gra-ui pairwise-merge"
      data-count={groups.length}
      data-state={isComplete ? "complete" : selected === null ? "ready" : "selected"}
    >
      <ul aria-label="Groups available for merging" className="pairwise-merge__groups">
        {groups.map((group, index) => (
          <li className="pairwise-merge__item" key={group.join("-")}>
            <button
              aria-label={`Merge group ${index + 1}`}
              aria-pressed={selected === index}
              className="pairwise-merge__group"
              data-merged={merged === index ? "true" : undefined}
              data-selected={selected === index ? "true" : undefined}
              onDoubleClick={() => chooseGroup(index)}
              onKeyDown={(event) => {
                if (isActivationKey(event.key)) {
                  event.preventDefault();
                  chooseGroup(index);
                }
              }}
              type="button"
            >
              {group.map((pieceIndex) => pieces[pieceIndex])}
            </button>
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="pairwise-merge__status">
        {isComplete
          ? groups.length === 0
            ? "Nothing to merge"
            : "One group remains"
          : selected === null
            ? `${groups.length} groups remain`
            : "Choose one more group"}
      </p>

      {isComplete ? (
        <button
          className="pairwise-merge__reset"
          onClick={() => setState({ groups: initialGroups, selected: null, merged: null })}
          type="button"
        >
          Separate again
        </button>
      ) : null}
    </section>
  );
}
