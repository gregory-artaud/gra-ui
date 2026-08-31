import * as React from "react";

const ROLES = ["subject", "action", "object"] as const;
type Role = (typeof ROLES)[number];

export interface RoleAssemblyProps {
  subject: string;
  action: string;
  object: string;
}

export function RoleAssembly({ subject, action, object }: RoleAssemblyProps) {
  const [state, setState] = React.useState({ step: 0, wrong: false });
  const labels: Record<Role, string> = { subject, action, object };
  const complete = state.step === ROLES.length;
  const assembled = ROLES.slice(0, state.step).map((role) => labels[role]);

  const chooseRole = (role: Role) => {
    setState((previous) => role === ROLES[previous.step]
      ? { step: previous.step + 1, wrong: false }
      : { step: 0, wrong: true });
  };

  return (
    <section aria-label="Assemble a sentence in the prescribed role order" className="gra-ui role-assembly" data-complete={complete} data-wrong={state.wrong}>
      <header className="role-assembly__header">
        <span>Role assembly</span>
        <output aria-live="polite">{complete ? "Sentence approved" : `${state.step} / ${ROLES.length} roles`}</output>
      </header>

      <div className="role-assembly__sentence" aria-live="polite">
        <span className="role-assembly__caption">Assembled sentence</span>
        <p>{assembled.length === 0 ? "Choose a grammatical office to begin." : assembled.join(" ")}{complete ? "." : ""}</p>
      </div>

      <div aria-label="Sentence roles" className="role-assembly__roles">
        {ROLES.map((role) => (
          <button disabled={complete} key={role} data-accepted={state.step > ROLES.indexOf(role)} onClick={() => chooseRole(role)} type="button">
            <strong>{role}</strong>
            <small>{labels[role]}</small>
          </button>
        ))}
      </div>

      <footer className="role-assembly__footer">
        <p>{state.wrong ? "That office arrived out of order. The sentence has been returned to intake." : complete ? "The sentence has survived its unnecessary grammar checkpoint." : `Next office: ${ROLES[state.step]}.`}</p>
        <button className="role-assembly__reset" disabled={state.step === 0 && !state.wrong} onClick={() => setState({ step: 0, wrong: false })} type="button">
          Disassemble sentence
        </button>
      </footer>
    </section>
  );
}
