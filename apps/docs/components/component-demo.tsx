import { Button, CountedClone, RepeatChildren } from "gra-ui";

import type { DemoKind } from "@/components/component-docs";
import { Playground } from "@/components/playground";

export function ComponentDemo({ kind }: { kind: DemoKind }) {
  if (
    kind === "indecisive" ||
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
    kind === "nest-children"
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
