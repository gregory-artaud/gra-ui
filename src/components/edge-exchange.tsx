import * as React from "react";

export interface EdgeExchangeProps {
  label: string;
}

function exchangeEdges(word: string) {
  const characters = Array.from(word);
  if (characters.length < 2) return word;
  const first = characters[0];
  const last = characters[characters.length - 1];
  characters[0] = last;
  characters[characters.length - 1] = first;
  return characters.join("");
}

function transform(label: string) {
  return label.split(/(\s+)/).map((part) => (/\s+/.test(part) ? part : exchangeEdges(part))).join("");
}

export function EdgeExchange({ label }: EdgeExchangeProps) {
  const [exchanged, setExchanged] = React.useState(false);
  const displayed = exchanged ? transform(label) : label;

  return (
    <section aria-label="Exchange the edges of every word" className="gra-ui edge-exchange" data-state={exchanged ? "exchanged" : "ordinary"}>
      <header className="edge-exchange__header">
        <span>Edge exchange</span>
        <output aria-live="polite">{exchanged ? "Edges traded" : "Original order"}</output>
      </header>

      <div className="edge-exchange__paper" aria-live="polite">
        <span className="edge-exchange__caption">Displayed label</span>
        <p>{displayed || "An empty label has no edges to trade."}</p>
        {exchanged ? <small>Every word surrendered its first and last character.</small> : null}
      </div>

      <footer className="edge-exchange__footer">
        <p aria-live="polite">{exchanged ? "The sentence remains technically recognizable and considerably less trustworthy." : "Trade the two edges of every word in one sweeping editorial decision."}</p>
        <div className="edge-exchange__actions">
          <button disabled={exchanged || !label} onClick={() => setExchanged(true)} type="button">Exchange edges</button>
          <button className="edge-exchange__reset" disabled={!exchanged} onClick={() => setExchanged(false)} type="button">Restore wording</button>
        </div>
      </footer>
    </section>
  );
}
