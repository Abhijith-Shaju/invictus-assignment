# Bugs found

---

## Bug 1 

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:** line 62 in /src/ExpenseList.jsx, changed the sorting logic to descending order.

---

## Bug 2

**How to reproduce:** Enter a expense entry and split it in such a way that it is not equally divisible.

**What was wrong:** The decimals when rounded up will generally fall short of the actual amount.

**What I changed:** Calculate the amount in cents, distribute it among the participant in order.

---

## Bug 3

**How to reproduce:** Choose a member in the Paid by filter.

**What was wrong:** The selected form value was a string while payer IDs are numbers, so the strict comparison rejected matching expenses.

**What I changed:** Normalize both values before comparing them. (line 36 in BalancesPanel.jsx)

---

## Bug 4

**How to reproduce:** Create an expense paid by Bob but split only between Alice, Charlie, and Dave.

**What was wrong:** Every payer is considered in the calculation even if the payer was not a participant.

**What I changed:** Credit the payer with the full amount paid and debit only the members who are actually included in the expense shares.

---

## Bug 5

**How to reproduce:** Filter the expense list, then edit or delete the first visible result when it is not the first expense in the full list.

**What was wrong:** Actions used the displayed array position, which changes after filtering and sorting.

**What I changed:** Pass each expense's stable ID to update and delete actions, and have the reducer match records by that ID.

---

## Bug 6

**How to reproduce:** View a group with both a member who has paid more than their share and one who owes money.

**What was wrong:** Positive balances were labelled as owing and negative balances as being owed, opposite to the calculated balance meaning.

**What I changed:** Positive balances now say the "is owed" that member; negative balances say that member "owes".

---

## Bug 7

**How to reproduce:** Create balances where one debtor owes exactly the same amount that one creditor is owed.

**What was wrong:** the transfer is not recorded first and the settlement loop goes past equal amounts.

**What I changed:** Record the transfer amount before advancing settled debtor and creditor entries, using cent values for exact comparisons.

---

## Bug 8

**How to reproduce:** Open the app. The filter section is above the entry section and not above the list.

**What is wrong:** The Filter section is not above the Expense List.

**What I changed:** Moved the ExpenseList component below the AddExpenseForm component.