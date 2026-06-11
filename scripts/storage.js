// storage.js
// Handles all localStorage read and write operations

const RECORDS_KEY = 'app:records';

export function saveRecords(records) {
  try {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save records:', e);
  }
}

export function loadRecords() {
  try {
    const data = localStorage.getItem(RECORDS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    console.error('Failed to load records:', e);
    return [];
  }
}

export function validateImportData(data) {
  if (!Array.isArray(data)) {
    return { valid: false, message: 'Import failed: expected an array of records.' };
  }
  const requiredFields = ['id', 'description', 'amount', 'category', 'date', 'createdAt', 'updatedAt'];
  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    for (const field of requiredFields) {
      if (!(field in record)) {
        return { valid: false, message: `Import failed: record ${i + 1} is missing field "${field}".` };
      }
    }
    if (typeof record.amount !== 'number') {
      return { valid: false, message: `Import failed: record ${i + 1} has invalid amount (must be a number).` };
    }
  }
  return { valid: true, message: '' };
}