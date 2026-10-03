*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

# 💰 Daily Expense Tracker — Built for My College Classmate

---

## What I Built

I built **Daily Expense Tracker**, a sleek, zero-friction web application designed to help college students easily track their day-to-day spending in Indian Rupees (**₹**) without dealing with bloated apps, sign-in walls, or intrusive ads.

### Who I Built It For & The Problem It Solves

As a second-year IT engineering student, moving into a college hostel comes with a sudden shock: **budgeting**. 

My roommate and close friend, **Kaushal**, constantly struggled with his monthly allowance. Between canteen snacks, semester reference books, lab prints, and daily bus passes, he would find his wallet empty by the third week of every month, having no idea where all his money went.

Most existing budgeting apps are overcomplicated: they demand phone numbers, require bank account linking, bombard you with credit card offers, or don't work offline.

I built this app specifically for Kaushal so he could:
1. **Log expenses in under 5 seconds** right from his phone or laptop browser.
2. **Classify spending** across student-essential categories: **Food**, **Travel**, **Shopping**, **Education**, and **Other**.
3. **See his total expenses update in real time** with a live transaction counter.
4. **Enjoy 100% privacy** — all data stays strictly on his device using browser `localStorage` with zero server tracking.

---

## Demo

- **Live Demo Link:** [https://kashyap-patel115.github.io/Expense-Tracker/](https://kashyap-patel115.github.io/Expense-Tracker/) 
- **Offline / Local Run:** Simply open `index.html` in any browser — no web server or npm required!

### ✨ Key Interface Highlights
* **Hero Overview Card:** High-contrast emerald green gradient displaying the live total spent (`₹`), transaction count, and current date.
* **Modern Inputs with SVG Icons:** Clean input fields for Expense Name, Amount in Rupees, Category picker, and Date picker.
* **Category Pill Badges:** Dynamic color-coded indicator dots (`● Food`, `● Travel`, `● Education`, `● Shopping`, `● Other`).
* **Real-time Feedback:** Slide-down error validation banners and floating toast alerts for additions and deletions.
* **Friendly Empty State:** Clean vector illustration greeting new users when no expenses are logged.

---

## Code

The entire project is open-source and intentionally lightweight:

- **GitHub Repository:** [https://github.com/Kashyap-Patel115/Expense-Tracker](https://github.com/Kashyap-Patel115/Expense-Tracker)

### Project Architecture

```text
Expense tracker/
│
├── index.html     # Semantic HTML5 with accessible form & data table
├── style.css      # Vanilla CSS3 with custom properties, CSS Grid & Flexbox
├── script.js      # Clean Vanilla JS (ES6) state management & LocalStorage
├── README.md      # Comprehensive open-source onboarding guide
└── SUBMISSION.md  # Hacktoberfest 2026 challenge entry
```

---

## How I Built It

To build this app quickly and cleanly without drowning in framework overhead, I used an **agentic pair-programming workflow** powered by **Google Antigravity IDE**:

1. **Architecture & Constraints First:**
   * Constrained the stack strictly to **pure HTML5, CSS3, and Vanilla JavaScript** to keep it accessible for first-year engineering students and first-time open-source contributors.
   * Leveraged the browser's native **Web Storage API (`localStorage`)** to eliminate server dependencies, cloud bills, and latency.

2. **Fintech Design Iteration:**
   * Used modern typography pairings via Google Fonts: **Plus Jakarta Sans** for crisp UI reading and **Outfit** for bold, readable financial figures.
   * Engineered a curated emerald green color palette (`#065f46` to `#10b981`) that evokes financial wellness and clarity.
   * Built responsive layouts using CSS Grid and Flexbox with media queries tailored down to 360px mobile screens.

3. **Defensive Logic & Edge Cases:**
   * Built input sanitation preventing negative amounts, `₹0` entries, or blank descriptions.
   * Added Indian numbering currency formatting (`en-IN`) so large student expenses (e.g. semester fees or tech gear) format cleanly as `₹1,250.00`.

---

## Why Does Open Innovation Matter?

Open innovation is what made the web accessible to everyone in the first place, and it matters deeply for tools like this:

1. **Financial Privacy by Design:** 
   Closed financial apps monetize student data by selling spending habits to lenders, credit card companies, and advertisers. Because this project is built on open standards and client-side storage, Aarav's personal data never leaves his browser.

2. **Hackability for Fellow Students:**
   Because there are no obscure build tools (`npm`, `webpack`, `vite`), any first-year IT student can fork this repo, inspect the code, tweak the categories to fit their campus (e.g., adding *"Hostel Mess"* or *"Tech Fest"*), and learn how DOM manipulation works under the hood.

3. **Longevity & Independence:**
   Closed APIs get deprecated, monetized, or shut down. An open-source, standard-compliant HTML/CSS/JS application will continue working in any browser 10 years from now without breaking.

---

## My Agent Session

This project was developed through an interactive human-in-the-loop pair programming session using the **Antigravity IDE**:
* Refined form requirements and accessibility guidelines.
* Iterated on fintech UI aesthetics (converting a basic table into a modern dashboard with ambient glows, icon wrappers, and category pills).
* Audited input validation and LocalStorage serialization.

---

## Prize Categories

- **Build for a Friend** (Primary Category — Built for my hostel roommate Kaushal to conquer second year college budgeting)
- **Most Impactful Open-Source Beginner Project**

---

<!-- Team Submissions: Built solo by a second-year IT engineering student for Hacktoberfest 2026 -->

*Thank you to the DEV Community and the Hacktoberfest team for fostering open-source innovation!*

## 📄 License

This project is open-source and free to use for educational purposes under the [MIT License](https://opensource.org/licenses/MIT).

