# Data Model

## Theme: Student Finance Tracker

---

## Record Structure

| Field | Type | Format | Example |
|-------|------|--------|---------|
| `id` | string | `txn_XXXX` | `txn_0001` |
| `description` | string | Free text | `Lunch at cafeteria` |
| `amount` | number | Up to 2 decimals | `12.50` |
| `category` | string | From fixed list | `Food` |
| `date` | string | `YYYY-MM-DD` | `2025-09-29` |
| `createdAt` | string | ISO 8601 | `2025-09-29T14:32:00.000Z` |
| `updatedAt` | string | ISO 8601 | `2025-09-29T14:32:00.000Z` |

---

## Example Record

```json
{
  "id": "txn_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.50,
  "category": "Food",
  "date": "2025-09-29",
  "createdAt": "2025-09-29T14:32:00.000Z",
  "updatedAt": "2025-09-29T14:32:00.000Z"
}
```

---

## Default Categories

1. Food
2. Books
3. Transport
4. Entertainment
5. Fees
6. Other

---

## localStorage Keys

| Key | Value |
|-----|-------|
| `app:records` | JSON array of all records |
| `app:settings` | JSON object with currency rates and cap |

---

## Settings Structure

```json
{
  "baseCurrency": "USD",
  "rates": {
    "EUR": 0.92,
    "GBP": 0.79
  },
  "spendingCap": 500
}
```

---

## ID Generation Rule

First record is `txn_0001`. Each new record increments by 1.
Format is always `txn_` followed by a 4-digit padded number.

---

## Timestamp Rule

- `createdAt` is set once when record is created using `new Date().toISOString()`
- `updatedAt` is updated every time the record is edited
- `createdAt` never changes after creation