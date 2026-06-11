// validators.js
// All regex validation rules for the Student Finance Tracker

// Rule 1: Description
// Must not have leading or trailing spaces
// Must not be empty
export function validateDescription(value) {
  if (value.trim() === '') {
    return { valid: false, message: 'Description is required.' };
  }
  const pattern = /^\S(?:.*\S)?$/;
  if (!pattern.test(value)) {
    return { valid: false, message: 'Description must not have leading or trailing spaces.' };
  }
  const duplicate = /\b(\w+)\s+\1\b/i;
  if (duplicate.test(value)) {
    return { valid: false, message: 'Warning: duplicate word detected (e.g. "the the").' };
  }
  return { valid: true, message: '' };
}

// Rule 2: Amount
// Must be a valid number with up to 2 decimal places
// Cannot be negative
export function validateAmount(value) {
  if (value.trim() === '') {
    return { valid: false, message: 'Amount is required.' };
  }
  const pattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
  if (!pattern.test(value)) {
    return { valid: false, message: 'Amount must be a valid number (e.g. 12.50). No negatives or more than 2 decimal places.' };
  }
  return { valid: true, message: '' };
}

// Rule 3: Date
// Must be in YYYY-MM-DD format
// Month must be 01-12, day must be 01-31
export function validateDate(value) {
  if (value.trim() === '') {
    return { valid: false, message: 'Date is required.' };
  }
  const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!pattern.test(value)) {
    return { valid: false, message: 'Date must be in YYYY-MM-DD format (e.g. 2025-09-29).' };
  }
  return { valid: true, message: '' };
}

// Rule 4: Category
// Letters only, spaces and hyphens allowed between words
// Cannot start or end with space or hyphen
export function validateCategory(value) {
  if (value.trim() === '') {
    return { valid: false, message: 'Category is required.' };
  }
  const pattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
  if (!pattern.test(value)) {
    return { valid: false, message: 'Category must contain letters only (spaces and hyphens allowed between words).' };
  }
  return { valid: true, message: '' };
}

// Rule 5: Advanced — Duplicate word detection (back-reference)
// Catches repeated words like "the the" or "at at"
// This is used inside validateDescription above
// Exported separately so tests.html can test it directly
export function validateNoDuplicateWords(value) {
  const pattern = /\b(\w+)\s+\1\b/i;
  if (pattern.test(value)) {
    return { valid: false, message: 'Duplicate word detected (e.g. "the the").' };
  }
  return { valid: true, message: '' };
}