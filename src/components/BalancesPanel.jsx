import { balancePresentation } from "../lib/balances.js";

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BalancesPanel({ members, balances }) {
  return (
    <section className="card">
      <h2>Balances</h2>
      {members.map((m) => {
        const { label, className } = balancePresentation(balances[m.id]);
        return (
          <div className="balance-row" key={m.id}>
            <div className="who">
              <span className="avatar" style={{ background: m.color }}>
                {initials(m.name)}
              </span>
              {m.name}
            </div>
            <div className={className}>{label}</div>
          </div>
        );
      })}
    </section>
  );
}
