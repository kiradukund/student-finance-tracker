// ui.js
// Renders records to the table

import { highlight } from './search.js';

export function renderTable(records, regex = null) {
  const tbody = document.getElementById('records-tbody');
  tbody.innerHTML = '';

  if (records.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="5" style="text-align:center; color:#64748b;">
      No records found.</td>`;
    tbody.appendChild(tr);
    return;
  }

  records.forEach(record => {
    const tr = document.createElement('tr');

    const descCell = highlight(record.description, regex);
    const amountCell = highlight('$' + record.amount.toFixed(2), regex);
    const categoryCell = highlight(record.category, regex);
    const dateCell = highlight(record.date, regex);

    tr.innerHTML = `
      <td>${descCell}</td>
      <td>${amountCell}</td>
      <td>${categoryCell}</td>
      <td>${dateCell}</td>
      <td>
        <button type="button"
          class="edit-btn"
          data-id="${record.id}"
          aria-label="Edit ${record.description}">Edit</button>
        <button type="button"
          class="danger delete-btn"
          data-id="${record.id}"
          aria-label="Delete ${record.description}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}