# Student Finance Tracker

A responsive, accessible expense tracker built with vanilla HTML, CSS, and JavaScript.

**Theme:** Student Finance Tracker
**Live Demo:** https://kiradukund.github.io/student-finance-tracker/

---

## Overview

Helps students track daily expenses across categories:
Food, Books, Transport, Entertainment, Fees, and Other.
Built by IRADUKUNDA CYUSA Kevin as a university web development assignment.

---

## Setup

1. Clone this repository
2. Open `index.html` in any modern browser
3. No installation needed

To run tests: open `tests.html` in the browser using Live Server.

---

## Features

- Add, edit, and delete expense records
- Six default categories: Food, Books, Transport, Entertainment, Fees, Other
- Sort records by date, description, or amount (ascending and descending)
- Live regex search with match highlighting using `<mark>` tags
- Case-insensitive search toggle
- Spending cap with live ARIA budget warnings
- Currency conversion display: USD, EUR, GBP with manual rates in Settings
- Auto-save to localStorage on every change
- Import records from JSON file with full structure validation
- Export records to JSON file
- Fully keyboard navigable — no mouse required
- ARIA live regions for screen reader announcements
- Responsive layout: mobile (360px), tablet (768px), desktop (1024px)
- Skip-to-content link for keyboard users
- Visible focus indicators on all interactive elements

---

## Regex Catalog

| Rule | Pattern | Valid Example | Invalid Example |
|------|---------|---------------|-----------------|
| Description | `/^\S(?:.*\S)?$/` | `Lunch at cafeteria` | ` Lunch` (leading space) |
| Amount | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | `12.50` | `12.555` |
| Date | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | `2025-09-29` | `2025-13-01` |
| Category | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | `Bus Pass` | `Food!` |
| Duplicate word (advanced) | `/\b(\w+)\s+\1\b/i` | `Lunch at cafe` | `the the lunch` |

---

## Keyboard Map

| Key | Action |
|-----|--------|
| Tab | Move to next interactive element |
| Shift + Tab | Move to previous interactive element |
| Enter / Space | Activate buttons and links |
| Arrow keys | Navigate select dropdowns |
| Escape | Cancel edit mode and reset form |

---

## Accessibility Notes

- Landmarks used: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Skip-to-content link is the first focusable element on the page
- Every input has a visible `<label>` bound with `for` and `id`
- `aria-live="polite"` announces budget status updates
- `aria-live="assertive"` announces cap exceeded warnings
- Form errors announced immediately via `aria-live="assertive"`
- Colour contrast meets WCAG AA minimum 4.5:1 for all body text
- Visible focus outline on all interactive elements (2px solid blue)
- Table uses `<caption>` and `<th scope="col">` for screen readers
- Edit and Delete buttons use `aria-label` with record description

---

## How to Run Tests

1. Open `tests.html` in your browser using Live Server
2. All results display on the page automatically
3. Each test shows PASS or FAIL with a label
4. Final summary shows total passed and failed

---

## Demo Video

https://drive.google.com/file/d/1AIi2uI9SRFX4Bs_S_VtKq0eh1Xh1bQ3L/view?usp=sharing

---

## Developer

- **Name:** IRADUKUNDA CYUSA Kevin
- **GitHub:** kiradukund
- **Email:** k.iradukund@alustudent.com