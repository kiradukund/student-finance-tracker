// stats.js
// Computes dashboard statistics from the records array

export function computeStats(records) {
  const totalCount = records.length;

  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);

  // Top category
  const categoryCounts = {};
  records.forEach(r => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  });
  let topCategory = '--';
  let topCount = 0;
  for (const cat in categoryCounts) {
    if (categoryCounts[cat] > topCount) {
      topCount = categoryCounts[cat];
      topCategory = cat;
    }
  }

  // Last 7 days
  const today = new Date();
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayTotal = records
      .filter(r => r.date === dateStr)
      .reduce((sum, r) => sum + r.amount, 0);
    last7.push({ date: dateStr, total: dayTotal });
  }

  const last7Total = last7.reduce((sum, d) => sum + d.total, 0);

  return {
    totalCount,
    totalAmount,
    topCategory,
    last7,
    last7Total
  };
}

export function renderChart(last7) {
  const chart = document.getElementById('chart');
  chart.innerHTML = '';

  const max = Math.max(...last7.map(d => d.total), 1);

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;align-items:flex-end;gap:8px;height:100px;padding:8px 0;';

  last7.forEach(day => {
    const col = document.createElement('div');
    col.style.cssText = 'display:flex;flex-direction:column;align-items:center;flex:1;';

    const bar = document.createElement('div');
    const heightPct = Math.round((day.total / max) * 100);
    bar.style.cssText = `
      width:100%;
      height:${heightPct}px;
      background-color:#2563eb;
      border-radius:4px 4px 0 0;
      min-height:${day.total > 0 ? 4 : 0}px;
    `;
    bar.setAttribute('aria-label', `${day.date}: $${day.total.toFixed(2)}`);

    const label = document.createElement('div');
    label.style.cssText = 'font-size:0.65rem;color:#64748b;margin-top:4px;text-align:center;';
    label.textContent = day.date.slice(5);

    col.appendChild(bar);
    col.appendChild(label);
    wrapper.appendChild(col);
  });

  chart.appendChild(wrapper);
}

export function updateBudgetStatus(totalAmount, cap) {
  const statusEl = document.getElementById('budget-status');
  const warningEl = document.getElementById('cap-warning');

  if (!cap || cap <= 0) {
    statusEl.textContent = '';
    warningEl.textContent = '';
    return;
  }

  const remaining = cap - totalAmount;

  if (remaining >= 0) {
    statusEl.textContent =
      `Spending: $${totalAmount.toFixed(2)} of $${cap.toFixed(2)} cap. $${remaining.toFixed(2)} remaining.`;
    warningEl.textContent = '';
  } else {
    statusEl.textContent = '';
    warningEl.textContent =
      `Warning: You have exceeded your cap by $${Math.abs(remaining).toFixed(2)}!`;
  }
}