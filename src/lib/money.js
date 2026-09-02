export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function toCents(amount) {
  return Math.round(Number(amount) * 100);
}

export function fromCents(cents) {
  return cents / 100;
}

export function splitEqual(amount, ids) {
  if (!ids.length) return {};

  const total = toCents(amount);
  const share = Math.floor(total / ids.length);
  let remainder = total % ids.length;
  const shares = {};
  for (const id of ids) {
    const extraCent = remainder > 0 ? 1 : 0;
    shares[id] = fromCents(share + extraCent);
    remainder -= extraCent;
  }
  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents).map(toCents);
  return values.reduce((a, b) => a + b, 0) === 10_000;
}

export function splitByPercent(amount, percents) {
  const total = toCents(amount);
  const shares = {};
  const allocations = Object.entries(percents).map(([id, pct]) => ({
    id,
    cents: Math.floor((total * toCents(pct)) / 10_000),
  }));
  let remainder = total - allocations.reduce((sum, allocation) => sum + allocation.cents, 0);

  for (const allocation of allocations) {
    const extraCent = remainder > 0 ? 1 : 0;
    shares[allocation.id] = fromCents(allocation.cents + extraCent);
    remainder -= extraCent;
  }
  return shares;
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}
