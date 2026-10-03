/**
 * ==========================================================================
 * Expense Tracker Application
 * Hacktoberfest 2026 - Beginner Web App Project
 * Technologies: HTML5, CSS3, Vanilla JavaScript, LocalStorage
 * ==========================================================================
 */

// --- 1. DOM Elements Selection ---
const expenseForm = document.getElementById("expense-form");
const addExpenseBtn = document.getElementById("add-expense-btn");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseDateInput = document.getElementById("expense-date");
const todayShortcutBtn = document.getElementById("today-shortcut-btn");
const errorMessage = document.getElementById("error-message");
const errorText = document.getElementById("error-text");
const totalAmountElement = document.getElementById("total-amount");
const statCountElement = document.getElementById("stat-count");
const currentDateLabel = document.getElementById("current-date-label");
const itemCountElement = document.getElementById("item-count");
const emptyState = document.getElementById("empty-state");
const tableContainer = document.getElementById("table-container");
const expenseList = document.getElementById("expense-list");
const toast = document.getElementById("toast");

// --- 2. State & LocalStorage Management ---
const STORAGE_KEY = "hacktoberfest_expenses_2026";

/**
 * Safely load expenses from LocalStorage.
 * Handles private browsing or file:// storage restrictions gracefully.
 */
function getExpensesFromStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Storage access restricted or unavailable, using memory fallback.", err);
  }
  return [];
}

/**
 * Safely save expenses to LocalStorage.
 */
function saveExpensesToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("Could not save to LocalStorage:", err);
  }
}

// In-memory array holding all current expenses.
let expenses = getExpensesFromStorage();

// Timeout identifier for the toast notification
let toastTimer = null;

// --- 3. Helper Functions ---

/**
 * Returns today's date formatted as YYYY-MM-DD for date inputs.
 */
function getTodayIsoString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Sets the default value of the date input to today's date.
 */
function setDefaultDate() {
  if (expenseDateInput && !expenseDateInput.value) {
    expenseDateInput.value = getTodayIsoString();
  }
}

/**
 * Handler for the "Today" shortcut button next to the date input.
 */
function setTodayShortcut() {
  if (expenseDateInput) {
    expenseDateInput.value = getTodayIsoString();
    expenseDateInput.focus();
    showToast("Date set to Today");
  }
}

/**
 * Formats a number into Indian Rupee currency format (₹).
 * Example: 250 -> "₹250.00"
 */
function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return "₹" + num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Formats a date string (YYYY-MM-DD) into a human-readable format.
 * Example: "2026-10-01" -> "01 Oct 2026"
 */
function formatDate(dateString) {
  if (!dateString) return "-";
  try {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIdx = parseInt(month, 10) - 1;
      const monthName = months[monthIdx] || month;
      return `${day} ${monthName} ${year}`;
    }
  } catch (e) {
    console.error("Error formatting date:", e);
  }
  return dateString;
}

/**
 * Updates the date badge in the hero card based on actual recorded expenses.
 * Dynamically shows the relevant transaction date instead of statically showing "Today".
 */
function updateHeroDateBadge() {
  if (!currentDateLabel) return;

  if (!expenses || expenses.length === 0) {
    currentDateLabel.textContent = "All Time";
    return;
  }

  // Extract all valid date strings
  const dates = expenses.map(e => e.date).filter(Boolean);
  if (dates.length === 0) {
    currentDateLabel.textContent = "All Time";
    return;
  }

  // Unique sorted dates (most recent first)
  const uniqueDates = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));

  if (uniqueDates.length === 1) {
    // Exactly one date across all transactions
    currentDateLabel.textContent = formatDate(uniqueDates[0]);
  } else {
    // Multiple dates: show the latest transaction date
    currentDateLabel.textContent = `Latest: ${formatDate(uniqueDates[0])}`;
  }
}

/**
 * Displays an error message banner.
 */
function showError(message) {
  if (errorText) {
    errorText.textContent = message;
  }
  if (errorMessage) {
    errorMessage.style.display = "flex";
  }
}

/**
 * Clears and hides the error message banner.
 */
function clearError() {
  if (errorText) {
    errorText.textContent = "";
  }
  if (errorMessage) {
    errorMessage.style.display = "none";
  }
}

/**
 * Displays a smooth floating toast notification.
 */
function showToast(message) {
  if (!toast) return;
  if (toastTimer) clearTimeout(toastTimer);

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// --- 4. Render & UI Update Functions ---

/**
 * Recalculates total spent, transaction counter, and updates all cards.
 */
function updateTotal() {
  const total = expenses.reduce((sum, item) => {
    const val = parseFloat(item.amount);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // 1. Update formatted total amount
  if (totalAmountElement) {
    totalAmountElement.textContent = total.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // 2. Update transaction count pills
  const countText = `${expenses.length} ${expenses.length === 1 ? "Transaction" : "Transactions"}`;
  if (statCountElement) {
    statCountElement.textContent = countText;
  }
  if (itemCountElement) {
    itemCountElement.textContent = `${expenses.length} ${expenses.length === 1 ? "item" : "items"}`;
  }

  // 3. Update date pill in hero card
  updateHeroDateBadge();
}

/**
 * Renders the expense list in the HTML table or displays the empty state.
 */
function renderExpenses() {
  // Always update calculations first
  updateTotal();

  // If there are no expenses, show empty state and hide table
  if (expenses.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (tableContainer) tableContainer.style.display = "none";
    if (expenseList) expenseList.innerHTML = "";
    return;
  }

  // Otherwise, hide empty state and show table
  if (emptyState) emptyState.style.display = "none";
  if (tableContainer) tableContainer.style.display = "block";

  if (!expenseList) return;
  expenseList.innerHTML = "";

  // Render rows
  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    // 1. Expense Name
    const nameCell = document.createElement("td");
    nameCell.className = "expense-name-cell";
    nameCell.textContent = expense.name;
    row.appendChild(nameCell);

    // 2. Category Badge
    const categoryCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `category-badge category-${expense.category}`;
    badge.textContent = expense.category;
    categoryCell.appendChild(badge);
    row.appendChild(categoryCell);

    // 3. Date
    const dateCell = document.createElement("td");
    dateCell.className = "expense-date-cell";
    dateCell.textContent = formatDate(expense.date);
    row.appendChild(dateCell);

    // 4. Amount (in Indian Rupees)
    const amountCell = document.createElement("td");
    amountCell.className = "expense-amount-cell text-right";
    amountCell.textContent = formatCurrency(expense.amount);
    row.appendChild(amountCell);

    // 5. Delete Action Button
    const actionCell = document.createElement("td");
    actionCell.className = "text-center";
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
      <span>Delete</span>
    `;
    deleteBtn.setAttribute("aria-label", `Delete expense: ${expense.name}`);
    deleteBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      deleteExpense(expense.id, expense.name);
    });
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);

    expenseList.appendChild(row);
  });
}

// --- 5. Core Feature Functions ---

/**
 * Handles adding a new expense with validation.
 * Safe against double-firing, works with both button click and Enter key.
 */
function addExpense(event) {
  if (event) {
    if (typeof event.preventDefault === "function") event.preventDefault();
    if (typeof event.stopPropagation === "function") event.stopPropagation();
  }
  clearError();

  // Read input values
  const name = expenseNameInput ? expenseNameInput.value.trim() : "";
  const amountStr = expenseAmountInput ? expenseAmountInput.value.trim() : "";
  const amount = parseFloat(amountStr);
  const category = expenseCategoryInput ? expenseCategoryInput.value : "Other";
  const date = expenseDateInput ? expenseDateInput.value : "";

  // Validation 1: Expense name
  if (!name) {
    showError("Please enter a valid expense name.");
    if (expenseNameInput) expenseNameInput.focus();
    return false;
  }

  // Validation 2: Amount
  if (isNaN(amount) || amount <= 0) {
    showError("Please enter an amount greater than ₹0.");
    if (expenseAmountInput) expenseAmountInput.focus();
    return false;
  }

  // Validation 3: Date
  if (!date) {
    showError("Please select a date for this expense.");
    if (expenseDateInput) expenseDateInput.focus();
    return false;
  }

  // Create new expense object
  const newExpense = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category,
    date: date
  };

  // Add new expense to the top of list
  expenses.unshift(newExpense);

  // Persist to LocalStorage
  saveExpensesToStorage(expenses);

  // Re-render UI and metrics
  renderExpenses();

  // Show success toast
  showToast(`Added "${name}" (₹${amount.toFixed(2)})`);

  // Clear name and amount inputs for next entry
  if (expenseNameInput) expenseNameInput.value = "";
  if (expenseAmountInput) expenseAmountInput.value = "";
  // Note: We deliberately preserve the selected date so adding multiple
  // transactions for that same date doesn't force the user to re-pick it!

  if (expenseNameInput) expenseNameInput.focus();
  return false;
}

/**
 * Deletes an expense by its unique ID.
 */
function deleteExpense(id, name) {
  expenses = expenses.filter((item) => item.id !== id);
  saveExpensesToStorage(expenses);
  renderExpenses();
  showToast(name ? `Deleted "${name}"` : "Expense deleted");
}

// --- 6. Initialization ---
function init() {
  // Set default initial date in the date picker
  setDefaultDate();

  // Render initial list (from LocalStorage or empty state)
  renderExpenses();

  // 1. Button click listener
  if (addExpenseBtn) {
    addExpenseBtn.addEventListener("click", addExpense);
  }

  // 2. Form submit listener
  if (expenseForm) {
    expenseForm.addEventListener("submit", addExpense);

    // 3. Enter key press inside form inputs
    expenseForm.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addExpense(e);
      }
    });
  }

  // 4. "Today" shortcut button click listener
  if (todayShortcutBtn) {
    todayShortcutBtn.addEventListener("click", setTodayShortcut);
  }

  // 5. Clear error message when user types
  if (expenseNameInput) expenseNameInput.addEventListener("input", clearError);
  if (expenseAmountInput) expenseAmountInput.addEventListener("input", clearError);
  if (expenseDateInput) expenseDateInput.addEventListener("input", clearError);
}

// Start application
init();
