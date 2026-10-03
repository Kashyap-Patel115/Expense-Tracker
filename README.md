# 💰 Daily Expense Tracker Web App

> A modern, clean, and beginner-friendly **Daily Expense Tracker** built for the first-week Dev Challenge of **Hacktoberfest 2026**.

---

## 📌 Project Overview

Managing daily college spending, commute costs, and meals can be tough. This web application helps users easily record their day-to-day transactions, categorize expenses, and see their real-time total expenditure in Indian Rupees (**₹**).

Designed with a modern, high-contrast fintech aesthetic featuring:
* Premium **Plus Jakarta Sans** & **Outfit** typography.
* Radiant **emerald green gradients** and clean card layouts.
* Visual category pill indicators (`● Food`, `● Travel`, `● Shopping`, etc.).
* Built entirely with fundamental web standards: **pure HTML5, CSS3, and Vanilla JavaScript**.

---

## ✨ Features

1. **Add Expense**
   - Record an expense name (e.g., *College Canteen Lunch*, *Metro Pass*).
   - Enter amount in Indian Rupees (**₹**).
   - Choose a category: **Food**, **Travel**, **Shopping**, **Education**, or **Other**.
   - Pick the expense date (defaults to today).

2. **Display Expenses in a Data Table**
   - Clean, readable table displaying Expense Name, Category badge, Date, Amount (₹), and a Delete action.
   - Shows a friendly illustration & empty-state message when no expenses are recorded yet.

3. **Real-time Total Spending Overview**
   - Hero card with live spending total formatted in Indian currency format.
   - Shows live transaction counts and today's date badge.
   - Automatically recalculates when expenses are added or removed.

4. **Delete Expenses**
   - Easily delete any expense with a single click.
   - Table, transaction count, and total spent update instantly.

5. **Data Persistence (LocalStorage)**
   - Automatically saves all expenses directly in the browser's `localStorage`.
   - Your data stays intact even after refreshing the page or closing the browser.

6. **Input Validation & Feedback**
   - Prevents empty expense names.
   - Prevents zero, negative, or invalid amounts.
   - Animated error banner and smooth toast notifications for successful additions and deletions.

---

## 🛠️ Technologies Used

* **HTML5**: Semantic markup, accessible labels, and responsive layout structure.
* **CSS3**: Modern variables, CSS Grid, Flexbox, glassmorphic accents, and smooth micro-interactions.
* **Vanilla JavaScript (ES6)**: DOM manipulation, validation, arithmetic calculations, and event handling.
* **Web Storage API (`localStorage`)**: Client-side data storage without needing a server or database.
* **Google Fonts**: *Plus Jakarta Sans* for clean UI readability and *Outfit* for numbers and headings.

> **Note:** Zero external build tools, zero npm packages, and zero frameworks required.

---

## 📁 Project Structure

```text
Expense tracker/
│
├── index.html     # HTML structure and semantic markup
├── style.css      # Modern stylesheet with emerald accents
├── script.js      # Core logic, validation, and LocalStorage
└── README.md      # Project documentation and guide
```

---

## 🚀 How to Run the Project

### Option 1: Direct Run (Fastest)

1. Navigate to the project directory:
   ```text
   d:\Expense tracker
   ```
2. Double-click **`index.html`** to launch it in any modern browser (Google Chrome, Microsoft Edge, Firefox, or Safari).

### Option 2: Run with VS Code Live Server

1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **"Open with Live Server"**.
4. The application will open automatically at `http://127.0.0.1:5500`.

---

## 📝 Example Steps to Use the App

1. **Launch the App**: The hero card displays `₹ 0.00` with the status *"0 Transactions"* and the empty state *"No expenses recorded yet"*.
2. **Add an Expense**:
   - **Expense Name**: `Semester Textbooks`
   - **Amount (₹)**: `650`
   - **Category**: Select `Education`
   - **Date**: Defaults to today (or pick another date)
3. **Click Add Expense**:
   - A toast notification confirms: `Added "Semester Textbooks" (₹650.00)`.
   - The total spent updates to `₹ 650.00`.
   - The item appears at the top of your history table with a purple `Education` badge.
4. **Test Input Validation**:
   - Click **Add Expense** with an empty name or an amount of `0`.
   - A red error banner appears explaining the requirement.
5. **Test Persistence**:
   - Press `F5` to refresh the page.
   - Your transactions and total remain securely loaded from `localStorage`.
6. **Delete an Expense**:
   - Click the **Delete** button next to any transaction.
   - The row is removed with an instant update to the total spent.

---

## 🤝 Hacktoberfest 2026 Contribution Guide

This project is tailored for Hacktoberfest 2026 participants:
* Keep pull requests focused, clean, and well-described.
* Ensure code remains beginner-friendly with helpful comments.
* Check that responsive mobile layout is preserved.

---

## 📄 License

This project is open-source and free to use for educational purposes under the [MIT License](https://opensource.org/licenses/MIT).

