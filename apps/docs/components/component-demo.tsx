"use client";

import { Button, CountedClone, RepeatChildren } from "gra-ui";

import type { DemoKind } from "@/components/component-docs";
import { Playground } from "@/components/playground";

export function ComponentDemo({ kind }: { kind: DemoKind }) {
  if (
    kind === "markup-promotion" ||
    kind === "separator-ballot" ||
    kind === "belt-collector" ||
    kind === "operation-parade" ||
    kind === "redundancy-culler" ||
    kind === "coil-certification" ||
    kind === "witness-choice" ||
    kind === "shutter-pass" ||
    kind === "return-protocol" ||
    kind === "acronym-forge" ||
    kind === "notch-progress" ||
    kind === "filing-fork" ||
    kind === "pointer-plot" ||
    kind === "switchback-route" ||
    kind === "codepoint-receipt" ||
    kind === "spelling-permit" ||
    kind === "slice-referendum" ||
    kind === "compass-hinge" ||
    kind === "event-relay" ||
    kind === "alphabetize-words" ||
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
    kind === "weekday-ledger" ||
    kind === "binary-march" ||
    kind === "metric-mandate" ||
    kind === "crank-shift" ||
    kind === "gesture-patent" ||
    kind === "run-length-pack" ||
    kind === "clause-audit" ||
    kind === "terminus-choice" ||
    kind === "drop-silo" ||
    kind === "alphabetical-queue" ||
    kind === "percent-parcel" ||
    kind === "column-tally" ||
    kind === "rounding-ruling" ||
    kind === "tension-arc" ||
    kind === "gray-route" ||
    kind === "atbash-notice" ||
    kind === "apportion-veil" ||
    kind === "fate-panel" ||
    kind === "drift-pin" ||
    kind === "alternating-intake" ||
    kind === "vowel-shift" ||
    kind === "citation-ladder" ||
    kind === "prefix-referendum" ||
    kind === "perimeter-escort" ||
    kind === "checksum-order" ||
    kind === "edge-exchange" ||
    kind === "parcel-audit" ||
    kind === "format-fork" ||
    kind === "indent-tether" ||
    kind === "focus-parade" ||
    kind === "slug-mangle" ||
    kind === "crest-progress" ||
    kind === "shape-verdict" ||
    kind === "vanishing-point" ||
    kind === "fold-order" ||
    kind === "glyph-offset" ||
    kind === "decoration-toll" ||
    kind === "case-ballot" ||
    kind === "ratio-rail" ||
    kind === "edit-sequence" ||
    kind === "article-ejector" ||
    kind === "prime-ledger" ||
    kind === "caption-charter" ||
    kind === "caret-split" ||
    kind === "gate-sequence" ||
    kind === "column-transpose" ||
    kind === "decimal-erosion" ||
    kind === "voice-ruling" ||
    kind === "route-ink" ||
    kind === "skip-ledger" ||
    kind === "consonant-transfer"
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
