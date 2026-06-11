# Student Finance Tracker

A responsive, accessible expense tracker built with vanilla HTML, CSS, and JavaScript.

**Theme:** Student Finance Tracker
**Live Demo:** [GitHub Pages URL — add at M7]

---

## Overview

Helps students track daily expenses across categories:
Food, Books, Transport, Entertainment, Fees, and Other.

---

## Setup

1. Clone this repository
2. Open `index.html` in any browser
3. No installation needed

To run tests: open `tests.html` in the browser

---

## Features

- Add, edit, and delete expense records
- Six default categories: Food, Books, Transport, Entertainment, Fees, Other
- Sort records by date, description, or amount
- Live regex search with match highlighting
- Case-insensitive search toggle
- Spending cap with live budget warnings
- Currency conversion: USD, EUR, GBP with manual rates
- Auto-save to localStorage on every change
- Import records from JSON file with validation
- Export records to JSON file
- Fully keyboard navigable
- ARIA live regions for screen readers
- Responsive layout: mobile, tablet, and desktop

---

## Regex Catalog

| Rule | Pattern | Valid Example | Invalid Example |
|------|---------|---------------|-----------------|
| Description | `/^\S(?:.*\S)?$/` | `Lunch at cafeteria` | ` Lunch` (leading space) |
| Amount | `/^(0|[1-9]\d*)(\.\d{1,2})?$/` | `12.50` | `12.555` |
| Date | `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/` | `2025-09-29` | `2025-13-01` |
| Category | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | `Bus Pass` | `Food!` |
| Duplicate word | `/\b(\w+)\s+\1\b/i` | — | `the the lunch` |

---

## Keyboard Map

| Key | Action |
|-----|--------|
| Tab | Move to next interactive element |
| Shift + Tab | Move to previous interactive element |
| Enter / Space | Activate buttons and links |
| Arrow keys | Navigate select dropdowns |
| Escape | Cancel edit mode |

---

## Accessibility Notes

- Landmarks used: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Skip-to-content link is the first focusable element on the page
- Every input has a visible `<label>` bound with `for` and `id`
- `aria-live="polite"` announces budget status updates
- `aria-live="assertive"` announces cap exceeded warnings
- Form errors announced via `aria-live="assertive"`
- Colour contrast meets WCAG AA minimum 4.5:1
- Visible focus indicators on all interactive elements

---

## How to Run Tests

1. Open `tests.html` in your browser
2. All results display on the page
3. Each test shows PASS or FAIL with a label

---

## Demo Video

[Unlisted YouTube link — add at M7]

---

## Developer

- **Name:** IRADUKUNDA CYUSA Kevin
- **GitHub:** kiradukund
- **Email:** k.iradukund@alustudent.com
