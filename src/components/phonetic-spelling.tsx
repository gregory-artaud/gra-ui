import * as React from "react";

const PHONETIC: Record<string, string> = {
  A: "Alfa", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot", G: "Golf",
  H: "Hotel", I: "India", J: "Juliett", K: "Kilo", L: "Lima", M: "Mike", N: "November",
  O: "Oscar", P: "Papa", Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango", U: "Uniform",
  V: "Victor", W: "Whiskey", X: "X-ray", Y: "Yankee", Z: "Zulu",
};

function phoneticize(label: string) {
  return [...label].map((character) => {
    const word = PHONETIC[character.toUpperCase()];
    return word ?? (character === " " ? "·" : `⟦${character}⟧`);
  });
}

export interface PhoneticSpellingProps {
  label: string;
}

export function PhoneticSpelling({ label }: PhoneticSpellingProps) {
  const [spelled, setSpelled] = React.useState(false);
  const tokens = spelled ? phoneticize(label) : [label];

  return (
    <section aria-label="Spell the label with phonetic code words" className="gra-ui phonetic-spelling" data-spelled={spelled}>
      <header className="phonetic-spelling__header">
        <span>Phonetic spelling</span>
        <output aria-live="polite">{spelled ? `${tokens.length} signals` : "Readable"}</output>
      </header>

      <div className="phonetic-spelling__paper" aria-live="polite">
        <span className="phonetic-spelling__caption">Visible wording</span>
        <div className="phonetic-spelling__tokens">
          {tokens.map((token, index) => <span className="phonetic-spelling__token" key={`${token}-${index}`}>{token}</span>)}
        </div>
      </div>

      <footer className="phonetic-spelling__footer">
        <p>{spelled ? "Every character now has a full radio callsign, including the punctuation." : "Expand every character into a radio callsign before the label may travel."}</p>
        <div className="phonetic-spelling__actions">
          <button disabled={spelled} onClick={() => setSpelled(true)} type="button">Spell it out</button>
          <button className="phonetic-spelling__reset" disabled={!spelled} onClick={() => setSpelled(false)} type="button">Restore wording</button>
        </div>
      </footer>
    </section>
  );
}
