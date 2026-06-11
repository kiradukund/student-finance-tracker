// main.js
// Entry point — wires form, state, ui, search together

import {
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory
} from './validators.js';

import {
  getRecords,
  addRecord,
  updateRecord,
  deleteRecord,
  sortRecords
} from './state.js';

import { renderTable } from './ui.js';
import { validateImportData } from './storage.js';
import { replaceAllRecords } from './state.js';
import { compileRegex } from './search.js';
import { computeStats, renderChart, updateBudgetStatus } from './stats.js';

// --- Track edit mode and sort state ---
let editingId = null;
let sortField = 'date';
let sortDirection = 'desc';
let currentRegex = null;

// --- Helper: show or clear error message ---
function showError(fieldId, message) {
  const el = document.getElementById(fieldId + '-error');
  if (el) el.textContent = message;
}

// --- Helper: show form status message ---
function showStatus(message, isError = false) {
  const el = document.getElementById('form-status');
  if (el) {
    el.textContent = message;
    el.style.color = isError ? '#dc2626' : '#16a34a';
    setTimeout(() => { el.textContent = ''; }, 3000);
  }
}

// --- Re-render table with current sort and search ---
// --- Refresh dashboard stats ---
function refreshStats() {
  const records = getRecords();
  const stats = computeStats(records);

  document.getElementById('stat-total-records').textContent = stats.totalCount;
  document.getElementById('stat-total-spent').textContent = '$' + stats.totalAmount.toFixed(2);
  document.getElementById('stat-top-category').textContent = stats.topCategory;
  document.getElementById('stat-last7').textContent = '$' + stats.last7Total.toFixed(2);

  renderChart(stats.last7);

  const cap = parseFloat(localStorage.getItem('app:cap') || '0');
  updateBudgetStatus(stats.totalAmount, cap);
}

function refreshTable() {
  const sorted = sortRecords(sortField, sortDirection);
  const searchInput = document.getElementById('search-input').value;
  const caseToggle = document.getElementById('case-toggle').checked;
  const flags = caseToggle ? 'i' : '';
  currentRegex = compileRegex(searchInput, flags);

  const searchError = document.getElementById('search-error');
  if (searchInput && !currentRegex) {
    searchError.textContent = 'Invalid regex pattern.';
  } else {
    searchError.textContent = '';
  }

  const filtered = currentRegex
    ? sorted.filter(r =>
        currentRegex.test(r.description) ||
        currentRegex.test(r.category) ||
        currentRegex.test(r.date) ||
        currentRegex.test(String(r.amount))
      )
    : sorted;

  renderTable(filtered, currentRegex);
  refreshStats();
}

// --- Validate form fields ---
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

// --- Live validation on input ---
document.getElementById('description').addEventListener('input', () => {
  const result = validateDescription(document.getElementById('description').value);
  showError('description', result.message);
});

document.getElementById('amount').addEventListener('input', () => {
  const result = validateAmount(document.getElementById('amount').value);
  showError('amount', result.message);
});

document.getElementById('date').addEventListener('input', () => {
  const result = validateDate(document.getElementById('date').value);
  showError('date', result.message);
});

document.getElementById('category').addEventListener('change', () => {
  const result = validateCategory(document.getElementById('category').value);
  showError('category', result.message);
});

// --- Form submit: add or update record ---
document.getElementById('expense-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) {
    showStatus('Please fix the errors above.', true);
    return;
  }

  const data = {
    description: document.getElementById('description').value,
    amount: document.getElementById('amount').value,
    category: document.getElementById('category').value,
    date: document.getElementById('date').value
  };

  if (editingId) {
    updateRecord(editingId, data);
    editingId = null;
    document.getElementById('submit-btn').textContent = 'Add Expense';
    document.getElementById('form-heading').textContent = 'Add Expense';
    showStatus('Record updated successfully!');
  } else {
    addRecord(data);
    showStatus('Expense added successfully!');
  }

  document.getElementById('expense-form').reset();
  refreshTable();
});

// --- Edit and Delete buttons (event delegation) ---
document.getElementById('records-tbody').addEventListener('click', (e) => {
  const editBtn = e.target.closest('.edit-btn');
  const deleteBtn = e.target.closest('.delete-btn');

  if (editBtn) {
    const id = editBtn.dataset.id;
    const record = getRecords().find(r => r.id === id);
    if (!record) return;

    document.getElementById('description').value = record.description;
    document.getElementById('amount').value = record.amount;
    document.getElementById('category').value = record.category;
    document.getElementById('date').value = record.date;

    editingId = id;
    document.getElementById('submit-btn').textContent = 'Update Expense';
    document.getElementById('form-heading').textContent = 'Edit Expense';
    document.getElementById('add-expense').scrollIntoView({ behavior: 'smooth' });
  }

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    const record = getRecords().find(r => r.id === id);
    if (!record) return;
    if (confirm(`Delete "${record.description}"?`)) {
      deleteRecord(id);
      showStatus('Record deleted.');
      refreshTable();
    }
  }
});

// --- Sort buttons ---
function setSortButton(field) {
  if (sortField === field) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortField = field;
    sortDirection = 'asc';
  }
  refreshTable();
}

document.getElementById('sort-date')
  .addEventListener('click', () => setSortButton('date'));
document.getElementById('sort-amount')
  .addEventListener('click', () => setSortButton('amount'));
document.getElementById('sort-description')
  .addEventListener('click', () => setSortButton('description'));

// --- Live search ---
document.getElementById('search-input').addEventListener('input', refreshTable);
document.getElementById('case-toggle').addEventListener('change', refreshTable);

// --- Initial render ---
refreshTable();
refreshStats();

document.getElementById('save-settings').addEventListener('click', () => {
  const cap = parseFloat(document.getElementById('spending-cap').value) || 0;
  const eur = document.getElementById('eur-rate').value;
  const gbp = document.getElementById('gbp-rate').value;
  localStorage.setItem('app:cap', cap);
  localStorage.setItem('app:eur', eur);
  localStorage.setItem('app:gbp', gbp);
  const statusEl = document.getElementById('form-status');
  statusEl.textContent = 'Settings saved!';
  setTimeout(() => { statusEl.textContent = ''; }, 3000);
  refreshStats();
});

function loadSettings() {
  const cap = localStorage.getItem('app:cap');
  const eur = localStorage.getItem('app:eur');
  const gbp = localStorage.getItem('app:gbp');
  if (cap) document.getElementById('spending-cap').value = cap;
  if (eur) document.getElementById('eur-rate').value = eur;
  if (gbp) document.getElementById('gbp-rate').value = gbp;
}

loadSettings();

// --- Export JSON ---
document.getElementById('export-btn').addEventListener('click', () => {
  const data = JSON.stringify(getRecords(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'finance-tracker-export.json';
  a.click();
  URL.revokeObjectURL(url);
});

// --- Import JSON ---
document.getElementById('import-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById('import-status');
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      const validation = validateImportData(parsed);
      if (!validation.valid) {
        statusEl.style.color = '#dc2626';
        statusEl.textContent = validation.message;
        return;
      }
      replaceAllRecords(parsed);
      refreshTable();
      statusEl.style.color = '#16a34a';
      statusEl.textContent = `Import successful: ${parsed.length} records loaded.`;
    } catch {
      statusEl.style.color = '#dc2626';
      statusEl.textContent = 'Import failed: file is not valid JSON.';
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});
// --- Escape key cancels edit mode ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && editingId) {
    editingId = null;
    document.getElementById('expense-form').reset();
    document.getElementById('submit-btn').textContent = 'Add Expense';
    document.getElementById('form-heading').textContent = 'Add Expense';
    showError('description', '');
    showError('amount', '');
    showError('date', '');
    showError('category', '');
  }
});