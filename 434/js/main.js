// LOG PAGE VARIABLES
let transactions = [];
let quickAddList = [];
let expenseToggle = 'spent';


const goalAmountInput = document.getElementById('goalAmount');
const goalDateInput = document.getElementById('goalDate');

function showGoalsKeyboard(){
  const k = document.getElementById("goalsKeyboard");
  k.style.visibility = 'visible';
}

function hideGoalsKeyboard(){
  const k = document.getElementById("goalsKeyboard");
  k.style.visibility = 'hidden';
}

function openAch(){
  const panel = document.getElementById('achievementPanel');
  panel.classList.add('open');
  const a_goal = document.getElementById('a_goal');
  if(localStorage.getItem("a_goal") == null){
    a_goal.style.opacity = 0.5;
  }else{
    a_goal.style.opacity = 1;
  }

  const a_log = document.getElementById('a_log');
  if(localStorage.getItem("a_log") == null){
    a_log.style.opacity = 0.5;
  }else{
    a_log.style.opacity = 1;
  }

  const a_quick = document.getElementById('a_quick');
  if(localStorage.getItem("a_quick") == null){
    a_quick.style.opacity = 0.5;
  }else{
    a_quick.style.opacity = 1;
  }

  const a_7 = document.getElementById('a_7');
  if(localStorage.getItem("a_7") == null){
    a_7.style.opacity = 0.5;
  }else{
    a_7.style.opacity = 1;
  }
}

function closeAch(){
  const panel = document.getElementById('achievementPanel');
  panel.classList.remove('open');
}

function openHist(){
  const panel = document.getElementById('historyPanel');
  panel.classList.add('open');
}

function closeHist(){
  const panel = document.getElementById('historyPanel');
  panel.classList.remove('open');
}

function updateGoal(){
  hideGoalsKeyboard();
  goalamount = goalAmountInput.value;
  goaldate = goalDateInput.value;
  if (!goalamount || !goaldate) {
    alert("Please enter both an amount and a date.");
    return;
  }
  arr = goaldate.split("-");
  var day = arr[2];
  var m = arr[1];
  var y = arr[0];
  const labl = document.getElementById('goallabel');
  labl.textContent = `Goal: Save $${goalamount.toString()} by ${m}/${day}/${y}!`;
  localStorage.setItem("goalAmount", goalamount.toString());
  localStorage.setItem("goalDate", goaldate);
  const d = new Date(goaldate);
  updateWeeklyBar(goalamount, d);
  localStorage.setItem("a_goal", "true");
}

function loadGoal(){
  let goalamount = 0;
  let goaldate = "";
  let amt = localStorage.getItem("goalAmount");
  let date = localStorage.getItem("goalDate");
  if(amt == null || amt == ""){
    goalamount = 1000;
  }else{
    goalamount = parseInt(amt, 10);
  }
  if(date == null){
    goaldate = "2026-1-1";
  }else{
    goaldate = date;
  }
  arr = goaldate.split("-");
  var day = arr[2];
  var m = arr[1];
  var y = arr[0];
  const labl = document.getElementById('goallabel');



  // LINE COMMENTED FOR TESTING LOG (it was causing errors)
  labl.textContent = `Goal: Save $${goalamount.toString()} by ${m}/${day}/${y}!`;




  const d = new Date(goaldate);
  updateWeeklyBar(goalamount, d);
} 

function getWeeks(date){
  const today = new Date();
  const difinMs = date - today;
  const weeks = difinMs/ 604800000;
  return Math.round(weeks);
}

function updateWeeklyBar(amt, date) {
  let goaltotal = amt/getWeeks(date);
  goaltotal = Math.round(goaltotal);
  localStorage.setItem("net", "75");
  let goalprogress = parseInt(localStorage.getItem("net"));
  let perc = Math.round(goalprogress/goaltotal * 100);
  setBarProgress('weeklybar', perc );
  const labl = document.getElementById('goalproglabel');
  labl.textContent = `You saved $75 this week! Save $${goaltotal.toString()} to stay on track to reach your goal of $${amt.toString()}!`;
}

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
//let showingRings = true;

/*function setProgress(ringId, percent, radius) {
  const circle = document.getElementById(ringId);
  if (!circle) return;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = offset;
}*/

function setBarProgress(barId, percent) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  bar.style.width = percent + '%';
}

function updateRings() {

  /*const val2 = document.getElementById('input2');
  const val3 = document.getElementById('input3');
  
  if (!val1 || !val2 || !val3) return;

  setProgress('daily', val1.value, 180);
  setProgress('weekly', val2.value, 140);
  setProgress('monthly', val3.value, 100);*/

  let amt = localStorage.getItem("goalAmount");
  let numamt;
  if(amt == null || amt == ""){
    numamt = 1000;
  }else{
    numamt = parseInt(amt, 10);
  }
  let goaltotal = numamt;
  let curvalue = localStorage.getItem("net");
  if (!curvalue){curvalue = 75;}
  let goalprogress = curvalue;
  let perc = Math.round(goalprogress/goaltotal * 100);
  setBarProgress('dailybar', perc );
  const labl = document.getElementById('proglabel');
  labl.textContent = `You are ${perc}% of the way to your goal of $${goaltotal}!`
  
}

/*function toggle() {
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
}*/

// ===== LOG PAGE (EXPENSES) FUNCTIONS =====

function toggleExpenseType(type) {
  console.log("Toggling expense type to: " + type);
  if (type === 'spent' || type === 'gained') {
    expenseToggle = type;
  }
  const spentBtn = document.getElementById('spent-btn');
  const gainedBtn = document.getElementById('gained-btn');
  const newSpentBtn = document.getElementById('new-quick-add-spent-btn');
  const newGainedBtn = document.getElementById('new-quick-add-gained-btn');

  // if (spentBtn && gainedBtn && newSpentBtn && newGainedBtn) {
  //   if (expenseToggle === 'spent') {
  //     spentBtn.style.backgroundColor = '#e6c11e';
  //     gainedBtn.style.backgroundColor = '#222';
  //     spentBtn.style.color = '#FFF';
  //     gainedBtn.style.color = '#999';
  //     newSpentBtn.style.backgroundColor = '#e6c11e';
  //     newGainedBtn.style.backgroundColor = '#222';
  //     newSpentBtn.style.color = '#FFF';
  //     newGainedBtn.style.color = '#999';
  //   } else {
  //     gainedBtn.style.backgroundColor = '#e6c11e';
  //     spentBtn.style.backgroundColor = '#222';
  //     gainedBtn.style.color = '#FFF';
  //     spentBtn.style.color = '#999';
  //     newGainedBtn.style.backgroundColor = '#e6c11e';
  //     newSpentBtn.style.backgroundColor = '#222';
  //     newGainedBtn.style.color = '#FFF';
  //     newSpentBtn.style.color = '#999';
  //   }
    if (spentBtn && gainedBtn && newSpentBtn && newGainedBtn) {
    if (expenseToggle === 'spent') {
      spentBtn.style.background = 'linear-gradient(135deg, #e6c11e 0%, #d4b01a 100%)';
      gainedBtn.style.background = '#222';
      spentBtn.style.color = '#FFF';
      gainedBtn.style.color = '#999';
      newSpentBtn.style.background = 'linear-gradient(135deg, #e6c11e 0%, #d4b01a 100%)';
      newGainedBtn.style.background = '#222';
      newSpentBtn.style.color = '#FFF';
      newGainedBtn.style.color = '#999';
    } else {
      gainedBtn.style.background = 'linear-gradient(135deg, #e6c11e 0%, #d4b01a 100%)';
      spentBtn.style.background = '#222';
      gainedBtn.style.color = '#FFF';
      spentBtn.style.color = '#999';
      newGainedBtn.style.background = 'linear-gradient(135deg, #e6c11e 0%, #d4b01a 100%)';
      newSpentBtn.style.background = '#222';
      newGainedBtn.style.color = '#FFF';
      newSpentBtn.style.color = '#999';
    }
  }
}

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
    quickAddList = JSON.parse(saved);
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



function enterExpense() {
  const category = expenseToggle;
  const amount = document.getElementById('amount-input').value;
  const title = document.getElementById('title-input').value;
  const date = document.getElementById('date-input').value;
  const time = document.getElementById('time-input').value;

  const transaction = {
    title: title,
    type: category,
    amount: amount,
    date: date,
    time: time
  };

  if (transaction.title == '' || transaction.amount == '' || transaction.date == '' || transaction.time == '') {
    makeToast('Fill in all fields before entering the transaction.');
    return;
  }

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  document.getElementById('amount-input').value = '';
  document.getElementById('title-input').value = '';
  setDefaultDateToToday('date-input');
  setDefaultTimetoToday('time-input');

  makeToast('Transaction added to history!');
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



function createQuickAddEntry() {
  const category = expenseToggle;
  const amount = document.getElementById('quick-add-amount-input').value;
  const title = document.getElementById('quick-add-title-input').value;

  if(!category || !amount || !title ) {
    console.log(category, amount, title)
    makeToast("Please fill out all fields")
    return
  }

  const quickAddEntry = {
    title: title,
    type: category,
    amount: amount
  };

  if (quickAddEntry.title == '' || quickAddEntry.amount == '') {
    displayErrorMessage();
    return;
  }

  quickAddList.push(quickAddEntry);
  localStorage.setItem('recurringTransactions', JSON.stringify(quickAddList));

  console.log(localStorage.getItem('recurringTransactions'))

  document.getElementById('quick-add-amount-input').value = '';
  document.getElementById('quick-add-title-input').value = '';

  toggleDisplay('create-new-quick-add-overlay', 'none');
  makeToast("New Quick Add entry created!")
  reloadQuickAdd();
  
}



function reloadQuickAdd() {
  organizeQuickAddByName();

  const quickAddListDiv = document.getElementById('quick-add-entries');
  const manageQuickAddListDiv = document.getElementById('manage-quick-add-entries')

  if (!quickAddListDiv) return;
  if (!manageQuickAddListDiv) return;

  quickAddListDiv.innerHTML = '';
  manageQuickAddListDiv.innerHTML = '';


  for (let i = 0; i < quickAddList.length; i++) {
    const t = quickAddList[i];
    const type = t.type === 'spent' ? '-$' : '+$';


    quickAddListDiv.innerHTML += `
      <div id="entry" class="expense-entry">
        <span style="display: inline-block; width: 50%;">${t.title}</span>
        <span style="display: inline-block; width: 35%;">${type}${t.amount}</span>
        <button class="edit-btn" onClick="addQuickAddEntry(${i})">+</button>
      </div>
      <div style="background-color: white; height: 2px; margin: 0px 20px;"></div>`;

    manageQuickAddListDiv.innerHTML += `
      <div id="entry" class="expense-entry">
        <span style="display: inline-block; width: 50%;">${t.title}</span>
        <span style="display: inline-block; width: 25%;">${type}${t.amount}</span>
        <button class="edit-btn" onClick="deleteQuickAddEntry(${i})">🗑</button>
        <button class="edit-btn">✎</button>                  
      </div>
      <div style="background-color: white; height: 2px; margin: 0px 20px;"></div>`

  }
}

function addQuickAddEntry(i) {
  // Always uses current date and time
  const date = new Date().toISOString().split('T')[0]
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const time = `${hh}:${mm}`
  entry = {
    title: quickAddList[i].title,
    type: quickAddList[i].type,
    amount: quickAddList[i].amount,
    date: date,
    time: time
  }
  transactions.push(entry);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  makeToast(`Added ${quickAddList[i].title || 'transaction'} to history`);
}

function deleteQuickAddEntry(i) {
  quickAddList.splice(i, 1);
  localStorage.setItem('recurringTransactions', JSON.stringify(quickAddList));
  makeToast("Deleted Quick Add entry");
  reloadQuickAdd();
}


function addRecurringToHistory(i) {
  const t = quickAddList[i];
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



function makeToast(message) {
  // Changes made: increased padding, font size, borderRadius, added minWidth and centered text,
  // and slightly stronger boxShadow to make the toast a bit bigger and more prominent.
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    left: '50%',
    bottom: '150px',
    transform: 'translateX(-50%) translateY(8px)',
    background: 'rgba(0,0,0,0.85)',
    color: '#fff',
    padding: '14px 20px',
    borderRadius: '8px',      
    fontSize: '24px',         
    minWidth: '180px',        
    textAlign: 'center',     
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)', 
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

function organizeQuickAddByName() {
  quickAddList.sort((a, b) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  localStorage.setItem('recurringTransactions', JSON.stringify(quickAddList));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log("startup")
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

  // LOG page defaults
  loadTransactions();
  loadRecurringTransactions();
  toggleExpenseType('spent');
  reloadQuickAdd();
  setDefaultDateToToday('date-input');
  setDefaultTimetoToday('time-input');
});


// ===== STATS PAGE FUNCTIONS =====

function calculateStats() {
  // Load transactions from localStorage
  const saved = localStorage.getItem('transactions');
  if (!saved) {
    return;
  }
  //alert(`${saved}`);
  
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
        <div style="margin: 15px 0; font-family: Verdana;">
          <div style="color: black; font-family: Verdana; margin-bottom: 5px; font-weight: bold;">${title}</div>
          <div class="stat-bar">
            <div class="stat-bar-fill ${totalSpent > totalGained ? 'spent' : ''}" 
                 style="width: ${percentage}%">
              <span class="stat-bar-label" >$${(totalSpent + totalGained).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;
    }
  });

  if (Object.keys(categories).length === 0) {
    container.innerHTML = '<p style="color: black;">No transactions in the last 30 days.</p>';
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

function toggleChart(x){
  const ws = document.getElementById('weekstats');
  const ms = document.getElementById('monthstats');
  const wc = document.getElementById('weekchart');
  const mc = document.getElementById('monthchart');
  if(x == "w"){
    ws.style.visibility = 'visible';
    wc.style.visibility = 'visible';
    ms.style.visibility = 'hidden';
    mc.style.visibility = 'hidden';
  }else{
    ms.style.visibility = 'visible';
    mc.style.visibility = 'visible';
    ws.style.visibility = 'hidden';
    wc.style.visibility = 'hidden';
  }
}

