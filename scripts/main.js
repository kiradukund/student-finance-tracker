// main.js
// Entry point — wires form validation to the UI

import {
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory
} from './validators.js';

// --- Helper: show or clear an error message ---
function showError(fieldId, message) {
  const el = document.getElementById(fieldId + '-error');
  if (el) {
    el.textContent = message;
  }
}

function clearError(fieldId) {
  const el = document.getElementById(fieldId + '-error');
  if (el) {
    el.textContent = '';
  }
}

// --- Helper: show form status message ---
function showStatus(message) {
  const el = document.getElementById('form-status');
  if (el) {
    el.textContent = message;
    setTimeout(() => { el.textContent = ''; }, 3000);
  }
}

// --- Validate all fields, return true if all pass ---
function validateForm() {
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;

  const d = validateDescription(description);
  const a = validateAmount(amount);
  const dt = validateDate(date);
  const c = validateCategory(category);

  showError('description', d.message);
  showError('amount', a.message);
  showError('date', dt.message);
  showError('category', c.message);

  return d.valid && a.valid && dt.valid && c.valid;
}

// --- Live validation on input (clears errors as user types) ---
document.getElementById('description').addEventListener('input', () => {
  const val = document.getElementById('description').value;
  const result = validateDescription(val);
  showError('description', result.message);
});

document.getElementById('amount').addEventListener('input', () => {
  const val = document.getElementById('amount').value;
  const result = validateAmount(val);
  showError('amount', result.message);
});

document.getElementById('date').addEventListener('input', () => {
  const val = document.getElementById('date').value;
  const result = validateDate(val);
  showError('date', result.message);
});

document.getElementById('category').addEventListener('change', () => {
  const val = document.getElementById('category').value;
  const result = validateCategory(val);
  showError('category', result.message);
});

// --- Form submit handler ---
document.getElementById('expense-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    showStatus('Please fix the errors above.');
    return;
  }

  // Form passed — we will add record logic in M4
  showStatus('Expense added successfully!');
  document.getElementById('expense-form').reset();
});