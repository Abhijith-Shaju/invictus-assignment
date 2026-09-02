import { fromCents, toCents } from "./money.js";

export function suggestSettlements(balances, members) {
  const nameOf = (id) => members.find((m) => m.id === id)?.name ?? `#${id}`;

  const debtors = [];
  const creditors = [];

  for (const [id, raw] of Object.entries(balances)) {
    const amount = toCents(raw);
    const memberId = Number(id);
    if (amount < 0) debtors.push({ id: memberId, amount: -amount });
    else if (amount > 0) creditors.push({ id: memberId, amount });
  }

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const transfers = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];
    const amount = Math.min(d.amount, c.amount);

    transfers.push({
      from: d.id,
      to: c.id,
      fromName: nameOf(d.id),
      toName: nameOf(c.id),
      amount: fromCents(amount),
    });
    d.amount -= amount;
    c.amount -= amount;
    if (d.amount === 0) i += 1;
    if (c.amount === 0) j += 1;
  }

  return transfers;
}
