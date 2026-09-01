import * as React from "react";

const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let encoded = "";

  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index];
    const second = bytes[index + 1];
    const third = bytes[index + 2];
    encoded += BASE64[first >> 2];
    encoded += BASE64[((first & 3) << 4) | ((second ?? 0) >> 4)];
    encoded += second === undefined ? "=" : BASE64[((second & 15) << 2) | ((third ?? 0) >> 6)];
    encoded += third === undefined ? "=" : BASE64[third & 63];
  }

  return encoded;
}

export interface Base64BureauProps {
  label: string;
}

export function Base64Bureau({ label }: Base64BureauProps) {
  const [encoded, setEncoded] = React.useState(false);
  const displayed = encoded ? encodeBase64(label) : label;

  return (
    <section aria-label="Transform a label into Base64" className="gra-ui base64-bureau" data-encoded={encoded}>
      <header className="base64-bureau__header">
        <span>Base64 bureau</span>
        <output aria-live="polite">{encoded ? "Parcel sealed" : "Readable"}</output>
      </header>

      <div className="base64-bureau__parcel" aria-live="polite">
        <span className="base64-bureau__caption">The label has requested transport encoding</span>
        <code key={`${label}-${encoded}`}>{displayed || "∅"}</code>
        <small>{encoded ? "The bytes are now disguised as a transport parcel." : "The original wording is still available for reading."}</small>
      </div>

      <footer className="base64-bureau__footer">
        <p>{encoded ? "A perfectly readable label has become a route-friendly secret." : "Seal the wording into a reversible machine parcel."}</p>
        <div className="base64-bureau__actions">
          <button disabled={encoded} onClick={() => setEncoded(true)} type="button">Seal as Base64</button>
          <button className="base64-bureau__reset" disabled={!encoded} onClick={() => setEncoded(false)} type="button">Unpack wording</button>
        </div>
      </footer>
    </section>
  );
}
