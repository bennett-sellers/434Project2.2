// Navigation function for tabs
function openTab(name, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(name).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Profile image click handler (for Stats page)
function profileImageClicked(id) {
  if (id) {
    var el = document.getElementById(id);
    if (el) el.style.display = "flex";
  }
}

// Show selection for Settings page
function showSelection() {
  const appetizer = document.querySelector('input[name="appetizer"]:checked');
  const entree = document.getElementById("entrees").value;
  let result = "";
  if (appetizer) {
    result += "Appetizer: " + appetizer.value + "\n";
  } else {
    result += "Appetizer: (none selected)\n";
  }
  result += "Entree: " + entree;
  document.getElementById("selectionResult").value = result;
}

// Progress rings functions (for future use if needed)
let showingRings = true;

function setProgress(ringId, percent, radius) {
  const circle = document.getElementById(ringId);
  if (!circle) return;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = offset;
}

function setBarProgress(barId, percent) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  bar.style.width = percent + '%';
}

function updateRings() {
  const val1 = document.getElementById('input1');
  const val2 = document.getElementById('input2');
  const val3 = document.getElementById('input3');
  
  if (!val1 || !val2 || !val3) return;

  setProgress('daily', val1.value, 180);
  setProgress('weekly', val2.value, 140);
  setProgress('monthly', val3.value, 100);
  setBarProgress('dailybar', val1.value);
  setBarProgress('weeklybar', val2.value);
  setBarProgress('monthlybar', val3.value);
}

function toggle() {
  showingRings = !showingRings;
  const ringsEl = document.getElementById('rings');
  const barsEl = document.getElementById('bars');
  const toggleBtn = document.querySelector('.toggle-btn');
  
  if (!ringsEl || !barsEl || !toggleBtn) return;
  
  if (showingRings) {
    ringsEl.style.display = 'block';
    barsEl.style.display = 'none';
    toggleBtn.textContent = 'Progress Bars';
  } else {
    ringsEl.style.display = 'none';
    barsEl.style.display = 'flex';
    toggleBtn.textContent = 'Progress Rings';
  }
}

// ===== LOG PAGE (EXPENSES) FUNCTIONS =====

let transactions = [];
let recurringTransactions = [];

function loadTransactions() {
  const saved = localStorage.getItem('transactions');
  if (saved) {
    transactions = JSON.parse(saved);
  }
  displayTransactions();
}

function loadRecurringTransactions() {
  const saved = localStorage.getItem('recurringTransactions');
  if (saved) {
    recurringTransactions = JSON.parse(saved);
  }
}

function setDefaultDateToToday(id) {
  const dateEl = document.getElementById(id);
  if (!dateEl) return;
  const today = new Date().toISOString().split('T')[0];
  dateEl.value = today;
}

function setDefaultTimetoToday(id) {
  const timeEl = document.getElementById(id);
  if (!timeEl) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  timeEl.value = `${hh}:${mm}`;
}

function addTransaction() {
  setDefaultDateToToday('dateInput');
  setDefaultTimetoToday('timeInput');
  toggleDisplay('add-input-container', 'block');
  toggleDisplay('addTransactionBtn', 'none');
  toggleDisplay('createRecurringTransactionBtn', 'none');
  toggleDisplay('manageRecurringBtn', 'none');
}

function enterExpense() {
  const category = document.getElementById('categorySelect').value;
  const amount = document.getElementById('amountInput').value;
  const title = document.getElementById('titleInput').value;
  const date = document.getElementById('dateInput').value;
  const time = document.getElementById('timeInput').value;

  const transaction = {
    title: title,
    type: category,
    amount: amount,
    date: date,
    time: time
  };

  if (transaction.title == '' || transaction.amount == '' || transaction.date == '' || transaction.time == '') {
    displayErrorMessage();
    return;
  }

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  document.getElementById('amountInput').value = '';
  document.getElementById('titleInput').value = '';
  document.getElementById('dateInput').value = '';
  document.getElementById('timeInput').value = '';

  displayTransactions();
  toggleDisplay('add-input-container', 'none');
  toggleDisplay('addTransactionBtn', 'block');
  toggleDisplay('createRecurringTransactionBtn', 'block');
  toggleDisplay('manageRecurringBtn', 'block');
}

function cancelEnterExpense() {
  document.getElementById('amountInput').value = '';
  document.getElementById('titleInput').value = '';
  document.getElementById('dateInput').value = '';
  document.getElementById('timeInput').value = '';
  toggleDisplay('add-input-container', 'none');
  toggleDisplay('addTransactionBtn', 'block');
  toggleDisplay('createRecurringTransactionBtn', 'block');
  toggleDisplay('manageRecurringBtn', 'block');
}

function displayTransactions() {
  organizeTransactionsByDate();
  const historyDiv = document.getElementById('transactionHistory');
  if (!historyDiv) return;

  historyDiv.innerHTML = '';

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    const type = t.type;

    historyDiv.innerHTML += `
      <div class="${type}-transaction">
        <span class="transaction-title">${t.title || ''}</span>
        <span class="${type}-transition">$${t.amount}</span>
        <span class="transaction-type">${t.type}</span>
        <span class="transaction-date">${t.date || ''}</span>
        <span class="transaction-time">${t.time || ''}</span>
        <button onclick="deleteTransaction(${i})">Delete</button>
      </div>
    `;
  }
}

function deleteTransaction(i) {
  transactions.splice(i, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  displayTransactions();
}

function createRecurringTransaction() {
  toggleDisplay('create-input-container', 'block');
  toggleDisplay('addTransactionBtn', 'none');
  toggleDisplay('createRecurringTransactionBtn', 'none');
  toggleDisplay('manageRecurringBtn', 'none');
}

function createExpense() {
  const category = document.getElementById('createCategorySelect').value;
  const amount = document.getElementById('createAmountInput').value;
  const title = document.getElementById('createTitleInput').value;

  const transaction = {
    title: title,
    type: category,
    amount: amount
  };

  if (transaction.title == '' || transaction.amount == '') {
    displayErrorMessage();
    return;
  }

  recurringTransactions.push(transaction);
  localStorage.setItem('recurringTransactions', JSON.stringify(recurringTransactions));

  document.getElementById('createAmountInput').value = '';
  document.getElementById('createTitleInput').value = '';

  toggleDisplay('create-input-container', 'none');
  toggleDisplay('addTransactionBtn', 'block');
  toggleDisplay('createRecurringTransactionBtn', 'block');
  toggleDisplay('manageRecurringBtn', 'block');
  displayCreatedMessage();
}

function cancelCreateExpense() {
  document.getElementById('createAmountInput').value = '';
  document.getElementById('createTitleInput').value = '';
  toggleDisplay('create-input-container', 'none');
  toggleDisplay('addTransactionBtn', 'block');
  toggleDisplay('createRecurringTransactionBtn', 'block');
  toggleDisplay('manageRecurringBtn', 'block');
}

function showManageRecurring() {
  const manageDiv = document.getElementById('manage-recurring-container');
  if (!manageDiv) return;
  
  if (manageDiv.style.display === 'none' || manageDiv.style.display === '') {
    manageDiv.style.display = 'block';
  } else {
    manageDiv.style.display = 'none';
  }
  const empty = document.getElementById('recurringEmpty');
  if (manageDiv.style.display === 'block') {
    if (Array.isArray(recurringTransactions) && recurringTransactions.length > 0) {
      empty.style.display = 'none';
    } else {
      empty.style.display = 'block';
    }
  }
  displayRecurringTransactions();
}

function displayRecurringTransactions() {
  organizeRecurringTransactionsByName();
  const recurringListDiv = document.getElementById('recurringList');
  if (!recurringListDiv) return;

  recurringListDiv.innerHTML = '';

  for (let i = 0; i < recurringTransactions.length; i++) {
    const t = recurringTransactions[i];
    const type = t.type;

    recurringListDiv.innerHTML += `
      <div class="recurring-${type}-transaction">
        <span class="recurring-transaction-title">${t.title || ''}</span>
        <span class="${type}">$${t.amount}</span>
        <span class="recurring-transaction-type">${t.type}</span>
        <button onclick="deleteRecurringTransaction(${i})">Delete</button>
        <button onclick="showAddtoHistory(${i})">Add to History</button>
        <input type="date" id="recurringDateInput${i}" class="input-field" placeholder="Date" style="display: none;">
        <input type="time" id="recurringTimeInput${i}" class="input-field" placeholder="Time" style="display: none;"> 
        <button id="confirmRecurringBtn${i}" onclick="addRecurringToHistory(${i})" style="display: none;">Confirm</button>
        <button id="cancelRecurringBtn${i}" onclick="cancelAddToHistory(${i})" style="display: none;">Cancel</button>
      </div>
    `;
  }
}

function deleteRecurringTransaction(i) {
  recurringTransactions.splice(i, 1);
  localStorage.setItem('recurringTransactions', JSON.stringify(recurringTransactions));
  displayRecurringTransactions();
}

function showAddtoHistory(i) {
  setDefaultDateToToday(`recurringDateInput${i}`);
  setDefaultTimetoToday(`recurringTimeInput${i}`);
  toggleDisplay(`confirmRecurringBtn${i}`, 'block');
  toggleDisplay(`cancelRecurringBtn${i}`, 'block');
  toggleDisplay(`recurringDateInput${i}`, 'block');
  toggleDisplay(`recurringTimeInput${i}`, 'block');
}

function addRecurringToHistory(i) {
  const t = recurringTransactions[i];
  const date = document.getElementById(`recurringDateInput${i}`).value;
  const time = document.getElementById(`recurringTimeInput${i}`).value;

  const transaction = {
    title: t.title,
    type: t.type,
    amount: t.amount,
    date: date,
    time: time
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  displayTransactions();
  cancelAddToHistory(i);

  makeToast(`Added ${t.title || 'transaction'} to history`);
}

function cancelAddToHistory(i) {
  const dateInput = document.getElementById(`recurringDateInput${i}`);
  const timeInput = document.getElementById(`recurringTimeInput${i}`);
  if (dateInput) dateInput.value = '';
  if (timeInput) timeInput.value = '';
  toggleDisplay(`confirmRecurringBtn${i}`, 'none');
  toggleDisplay(`cancelRecurringBtn${i}`, 'none');
  toggleDisplay(`recurringDateInput${i}`, 'none');
  toggleDisplay(`recurringTimeInput${i}`, 'none');
}

function toggleHistory() {
  const historyDiv = document.getElementById('transactionHistory');
  if (!historyDiv) return;
  
  if (historyDiv.style.display === 'none' || historyDiv.style.display === '') {
    toggleDisplay('transactionHistory', 'block');
  } else {
    toggleDisplay('transactionHistory', 'none');
  }
}

function displayErrorMessage() {
  const box = document.getElementById('error-message-container');
  if (!box) return;
  box.style.display = 'block';
  setTimeout(() => { box.style.display = 'none'; }, 2500);
}

function displayCreatedMessage() {
  const box = document.getElementById('created-message-container');
  if (!box) return;
  box.style.display = 'block';
  setTimeout(() => { box.style.display = 'none'; }, 2500);
}

function makeToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    left: '50%',
    bottom: '24px',
    transform: 'translateX(-50%) translateY(8px)',
    background: 'rgba(0,0,0,0.85)',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
    opacity: '0',
    transition: 'opacity 260ms ease, transform 260ms ease',
    zIndex: 9999,
    pointerEvents: 'none'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function toggleDisplay(id, displayState) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = displayState;
  }
}

function organizeTransactionsByDate() {
  transactions.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function organizeRecurringTransactionsByName() {
  recurringTransactions.sort((a, b) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  localStorage.setItem('recurringTransactions', JSON.stringify(recurringTransactions));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const defaultOpen = document.getElementById("defaultOpen");
  if (defaultOpen) {
    defaultOpen.click();
  }
  
  // Initialize rings if they exist on the page
  if (document.getElementById('daily')) {
    updateRings();
  }
  
  // Load transactions if on log page
  if (document.getElementById('transactionHistory')) {
    loadTransactions();
    loadRecurringTransactions();
  }
});


// ===== STATS PAGE FUNCTIONS =====

function calculateStats() {
  // Load transactions from localStorage
  const saved = localStorage.getItem('transactions');
  if (!saved) {
    return;
  }
  
  const transactions = JSON.parse(saved);
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let weekSpent = 0;
  let weekGained = 0;
  let monthSpent = 0;
  let monthGained = 0;
  let categories = {};

  transactions.forEach(t => {
    const transactionDate = new Date(`${t.date}T${t.time}`);
    const amount = parseFloat(t.amount) || 0;

    // Last 7 days
    if (transactionDate >= sevenDaysAgo) {
      if (t.type === 'spent') {
        weekSpent += amount;
      } else if (t.type === 'gained') {
        weekGained += amount;
      }
    }

    // Last 30 days
    if (transactionDate >= thirtyDaysAgo) {
      if (t.type === 'spent') {
        monthSpent += amount;
      } else if (t.type === 'gained') {
        monthGained += amount;
      }

      // Track by category (title)
      if (!categories[t.title]) {
        categories[t.title] = { spent: 0, gained: 0 };
      }
      if (t.type === 'spent') {
        categories[t.title].spent += amount;
      } else {
        categories[t.title].gained += amount;
      }
    }
  });

  // Update week stats
  const weekSpentEl = document.getElementById('week-spent');
  const weekGainedEl = document.getElementById('week-gained');
  const weekNetEl = document.getElementById('week-net');
  
  if (weekSpentEl) weekSpentEl.textContent = `$${weekSpent.toFixed(2)}`;
  if (weekGainedEl) weekGainedEl.textContent = `$${weekGained.toFixed(2)}`;
  if (weekNetEl) {
    const weekNet = weekGained - weekSpent;
    weekNetEl.textContent = `$${weekNet.toFixed(2)}`;
    weekNetEl.style.color = weekNet >= 0 ? '#4CAF50' : '#FF3B30';
  }

  // Update month stats
  const monthSpentEl = document.getElementById('month-spent');
  const monthGainedEl = document.getElementById('month-gained');
  const monthNetEl = document.getElementById('month-net');
  
  if (monthSpentEl) monthSpentEl.textContent = `$${monthSpent.toFixed(2)}`;
  if (monthGainedEl) monthGainedEl.textContent = `$${monthGained.toFixed(2)}`;
  if (monthNetEl) {
    const monthNet = monthGained - monthSpent;
    monthNetEl.textContent = `$${monthNet.toFixed(2)}`;
    monthNetEl.style.color = monthNet >= 0 ? '#4CAF50' : '#FF3B30';
  }

  // Display category breakdown
  displayCategoryBreakdown(categories);
}

function displayCategoryBreakdown(categories) {
  const container = document.getElementById('category-breakdown');
  if (!container) return;

  container.innerHTML = '';

  // Find max value for scaling bars
  let maxAmount = 0;
  Object.values(categories).forEach(cat => {
    const total = cat.spent + cat.gained;
    if (total > maxAmount) maxAmount = total;
  });

  // Create bars for each category
  Object.entries(categories).forEach(([title, amounts]) => {
    const totalSpent = amounts.spent;
    const totalGained = amounts.gained;
    const net = totalGained - totalSpent;

    if (totalSpent > 0 || totalGained > 0) {
      const percentage = ((totalSpent + totalGained) / maxAmount) * 100;
      
      container.innerHTML += `
        <div style="margin: 15px 0;">
          <div style="color: white; margin-bottom: 5px; font-weight: bold;">${title}</div>
          <div class="stat-bar">
            <div class="stat-bar-fill ${totalSpent > totalGained ? 'spent' : ''}" 
                 style="width: ${percentage}%">
              <span class="stat-bar-label">$${(totalSpent + totalGained).toFixed(2)}</span>
            </div>
          </div>
          <div style="color: white; font-size: 12px;">
            Spent: $${totalSpent.toFixed(2)} | Gained: $${totalGained.toFixed(2)} | Net: $${net.toFixed(2)}
          </div>
        </div>
      `;
    }
  });

  if (Object.keys(categories).length === 0) {
    container.innerHTML = '<p style="color: white;">No transactions in the last 30 days.</p>';
  }
}

// Initialize stats when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  
  // Calculate stats if on stats page
  if (document.getElementById('week-spent')) {
    calculateStats();
  }
});