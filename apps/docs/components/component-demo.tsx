import { Button, CountedClone, RepeatChildren } from "gra-ui";

import type { DemoKind } from "@/components/component-docs";
import { Playground } from "@/components/playground";

export function ComponentDemo({ kind }: { kind: DemoKind }) {
  if (
    kind === "clarity-debt" ||
    kind === "arithmetic-council" ||
    kind === "tether-pull" ||
    kind === "double-entry" ||
    kind === "signal-transcript" ||
    kind === "calibration-window" ||
    kind === "semantic-lottery" ||
    kind === "cellular-drift" ||
    kind === "reverse-queue" ||
    kind === "punctuation-sieve" ||
    kind === "recess-depth" ||
    kind === "custody-choice" ||
    kind === "counterweight" ||
    kind === "shadow-pair" ||
    kind === "center-out" ||
    kind === "punch-proof" ||
    kind === "sort-mandate" ||
    kind === "lens-rail" ||
    kind === "quota-procession" ||
    kind === "braidline" ||
    kind === "wheel-stamp" ||
    kind === "elastic-frame" ||
    kind === "neighbor-march" ||
    kind === "signal-choice" ||
    kind === "footnote-shift" ||
    kind === "precision-ladder" ||
    kind === "mask-ballot" ||
    kind === "free-drift" ||
    kind === "docket-sequence" ||
    kind === "vowel-hinge" ||
    kind === "ratchet-reveal" ||
    kind === "verdict-selector" ||
    kind === "orbit-stow" ||
    kind === "palindrome-latch" ||
    kind === "inside-out-words" ||
    kind === "focus-receipt" ||
    kind === "lasso-lock" ||
    kind === "ruler-rise" ||
    kind === "word-turnstile" ||
    kind === "margin-quota" ||
    kind === "letter-levy" ||
    kind === "rotation-tithe" ||
    kind === "parity-purge" ||
    kind === "blank-filing" ||
    kind === "momentum-weave" ||
    kind === "arrow-bias" ||
    kind === "space-staple" ||
    kind === "disclosure-spill" ||
    kind === "checkpoint-queue" ||
    kind === "cursor-proof" ||
    kind === "seam-fold" ||
    kind === "selection-seal" ||
    kind === "alphabet-treadmill" ||
    kind === "layout-referendum" ||
    kind === "child-gravity" ||
    kind === "scale-sweep" ||
    kind === "scroll-redact" ||
    kind === "word-relay" ||
    kind === "copy-echo" ||
    kind === "index-sum" ||
    kind === "side-split" ||
    kind === "indecisive" ||
    kind === "mixed-click" ||
    kind === "weight-vote" ||
    kind === "case-gate" ||
    kind === "equal-choice" ||
    kind === "split-label" ||
    kind === "focus-fade" ||
    kind === "press-escape" ||
    kind === "keystroke-stack" ||
    kind === "reorder-back" ||
    kind === "drag-duplicate" ||
    kind === "hover-confirm" ||
    kind === "hold-position" ||
    kind === "timed-release" ||
    kind === "length-order" ||
    kind === "click-order" ||
    kind === "corner-fold" ||
    kind === "pairwise-merge" ||
    kind === "average-position" ||
    kind === "last-remaining" ||
    kind === "focus-unpack" ||
    kind === "backspace-archive" ||
    kind === "hover-route" ||
    kind === "nest-children" ||
    kind === "drag-threshold" ||
    kind === "weekday-ledger"
  ) {
    return <Playground kind={kind} />;
  }

  return (
    <div className="static-demo">
      <div className="preview-toolbar">
        <span>Preview</span>
        <span className="preview-status"><i /> Ready</span>
      </div>
      <div className="static-demo-stage">
        {kind === "button" ? <Button variant="outline">A regular button</Button> : null}
        {kind === "counted-clone" ? (
          <>
            <CountedClone element={<span className="clone-target">One child</span>} />
            <code>data-child-count=&quot;1&quot;</code>
          </>
        ) : null}
        {kind === "repeat-children" ? (
          <div className="repeated-demo">
            <RepeatChildren><span className="clone-target">Again</span></RepeatChildren>
          </div>
        ) : null}
      </div>
    </div>
  );
}
