# Accessibility Plan

## Theme: Student Finance Tracker

---

## 1. Semantic Landmarks

| Area | Element |
|------|---------|
| Site header | `<header>` |
| Main navigation | `<nav>` |
| Main content | `<main id="main">` |
| Each section | `<section>` |
| Page footer | `<footer>` |

No `<div>` will be used where a semantic element exists.

---

## 2. Skip-to-Content Link

First element in `<body>`:

```html
<a href="#main" class="skip-link">Skip to main content</a>
```

Hidden by default, visible on keyboard focus.

---

## 3. Form Labels

Every input has a `<label>` with matching `for` and `id`.
No input uses placeholder as its only label.

Example:
- `<label for="description">Description</label>`
- `<input type="text" id="description">`

---

## 4. Focus Indicators

- Browser default outline is never removed
- Custom `:focus` style added in CSS
- Rule `outline: none` will not appear anywhere

---

## 5. ARIA Live Regions

| Region | Attribute | Fires When |
|--------|-----------|------------|
| Budget status | `aria-live="polite"` | Record added/edited/deleted and under cap |
| Cap warning | `aria-live="assertive"` | Total exceeds spending cap |
| Form errors | `aria-live="assertive"` | Validation fails on a field |
| Status messages | `role="status"` | Record saved, deleted, or imported |

---

## 6. Colour Contrast

- Target: WCAG AA minimum 4.5:1 for normal text
- Dark text on light background
- Colour is never the only way to show an error
- Error states use colour AND a text message

---

## 7. Keyboard Navigation

- Tab order follows visual reading order
- All table buttons (Edit, Delete) are `<button>` elements
- Every interactive element reachable by Tab
- Search input and checkbox are in natural tab order

---

## 8. Table Accessibility

- `<caption>` describes the table
- `<th scope="col">` on every header
- Edit and Delete buttons use `aria-label="Edit [description]"`

---

## 9. M7 Audit Checklist

- [ ] Tab through entire page with no mouse
- [ ] Activate skip link, confirm jumps to main
- [ ] Trigger cap exceeded, confirm live region updates
- [ ] Trigger form error, confirm it is announced
- [ ] Check all labels are visible and bound
- [ ] Run contrast checker on text colours
- [ ] Confirm no outline:none in stylesheet
- [ ] Check mark highlight contrast in search results