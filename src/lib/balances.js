import { formatMoney, fromCents, sharesForExpense, toCents } from "./money.js";

export function balancePresentation(balance) {
  const amount = Number(balance);

  if (amount > 0.005) {
    return { label: `is owed ${formatMoney(amount)}`, className: "owed" };
  }
  if (amount < -0.005) {
    return { label: `owes  ${formatMoney(-amount)}`, className: "owe" };
  }
  return { label: "settled up", className: "settled" };
}

export function computeBalances(members, expenses) {
  const bal = {};
  for (const m of members) bal[m.id] = 0;

  for (const exp of expenses) {
    const shares = sharesForExpense(exp);
    bal[exp.paidBy] = (bal[exp.paidBy] || 0) + toCents(exp.amount);

    for (const [id, share] of Object.entries(shares)) {
      const key = Number(id);
      bal[key] = (bal[key] || 0) - toCents(share);
    }
  }

  return Object.fromEntries(
    Object.entries(bal).map(([id, cents]) => [id, fromCents(cents)])
  );
}

export function totalSpent(expenses) {
  return expenses.reduce((s, e) => s + Number(e.amount), 0);
}
