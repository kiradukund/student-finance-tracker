// state.js
// Manages the in-memory records array
// localStorage will be added in M6

let records = [];
let nextId = 1;

function padId(n) {
  return 'txn_' + String(n).padStart(4, '0');
}

export function getRecords() {
  return records;
}

export function addRecord(data) {
  const now = new Date().toISOString();
  const record = {
    id: padId(nextId++),
    description: data.description,
    amount: parseFloat(data.amount),
    category: data.category,
    date: data.date,
    createdAt: now,
    updatedAt: now
  };
  records.push(record);
  return record;
}

export function updateRecord(id, data) {
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return null;
  const now = new Date().toISOString();
  records[index] = {
    ...records[index],
    description: data.description,
    amount: parseFloat(data.amount),
    category: data.category,
    date: data.date,
    updatedAt: now
  };
  return records[index];
}

export function deleteRecord(id) {
  records = records.filter(r => r.id !== id);
}

export function sortRecords(field, direction) {
  const sorted = [...records];
  sorted.sort((a, b) => {
    let valA = a[field];
    let valB = b[field];
    if (field === 'amount') {
      valA = parseFloat(valA);
      valB = parseFloat(valB);
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

