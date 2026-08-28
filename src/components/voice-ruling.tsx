import * as React from "react";

const VOICES = [
  { id: "solo", label: "Solo", detail: "one person owns the sentence" },
  { id: "chorus", label: "Chorus", detail: "the room claims it together" },
  { id: "witness", label: "Witness", detail: "someone else apparently said it" },
] as const;

type VoiceId = (typeof VOICES)[number]["id"];

export interface VoiceRulingProps {
  label: string;
}

export function VoiceRuling({ label }: VoiceRulingProps) {
  const [rulingState, setRulingState] = React.useState({ label, voice: null as VoiceId | null });
  const voice = rulingState.label === label ? rulingState.voice : null;
  const sentence = label || "An empty sentence awaits an owner.";

  return (
    <section
      aria-label="Choose who owns a sentence"
      className="gra-ui voice-ruling"
      data-voice={voice ?? "unruled"}
    >
      <header className="voice-ruling__header">
        <span>Voice ruling</span>
        <output aria-live="polite">{voice ? VOICES.find((item) => item.id === voice)?.label : "Unclaimed"}</output>
      </header>

      <div className="voice-ruling__paper" aria-live="polite">
        <span className="voice-ruling__caption">Statement under review</span>
        {!voice ? <p className="voice-ruling__plain">{sentence}</p> : null}
        {voice === "solo" ? (
          <p className="voice-ruling__solo"><strong>I</strong> report: <span>{sentence}</span></p>
        ) : null}
        {voice === "chorus" ? (
          <div className="voice-ruling__chorus">
            <span>WE</span>
            <p>{sentence}</p>
            <small>all present parties agree, apparently</small>
          </div>
        ) : null}
        {voice === "witness" ? (
          <blockquote className="voice-ruling__witness">
            <p>{sentence}</p>
            <cite>reported by an unspecified witness</cite>
          </blockquote>
        ) : null}
      </div>

      <div aria-label="Available voices" className="voice-ruling__voices">
        {VOICES.map((item) => (
          <button
            aria-pressed={voice === item.id}
            className="voice-ruling__voice"
            data-selected={voice === item.id}
            key={item.id}
            onClick={() => setRulingState({ label, voice: item.id })}
            type="button"
          >
            <strong>{item.label}</strong>
            <small>{item.detail}</small>
          </button>
        ))}
      </div>

      <footer className="voice-ruling__footer">
        <p>{voice ? "The wording now answers to a voice it did not request." : "Choose who is allowed to sound responsible."}</p>
        <button
          className="voice-ruling__reset"
          disabled={!voice}
          onClick={() => setRulingState({ label, voice: null })}
          type="button"
        >
          Withdraw ruling
        </button>
      </footer>
    </section>
  );
}
