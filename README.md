# FinTrack 💰
## 🌐 Live Demo

[View FinTrack Live](https://vercel.com/manal-s-projects6/fin-track/GCyStkUDzwt9uyaxynjZo6D1FjfP)

A modern personal finance dashboard built with React to help users track income, manage expenses, monitor budgets, and keep an eye on recurring subscriptions.

## ✨ Features

* **Dashboard Overview** — View total balance, income, expenses, savings rate, and monthly budget at a glance.
* **Transaction Management** — Add, edit, delete, search, and filter income and expense transactions.
* **Budget Tracking** — Set a monthly budget and monitor spending progress with visual status indicators.
* **Expense Analytics** — Visualize spending by category using an interactive pie chart.
* **Spending Breakdown** — Compare spending across categories with visual progress bars.
* **Monthly Spending Summary** — View total spending, number of expenses, average expense, and largest expense.
* **Subscription Tracker** — Add and remove recurring subscriptions and view estimated monthly and yearly costs.
* **Data Persistence** — Transaction, budget, and subscription data are saved using browser localStorage.
* **Responsive Design** — Optimized for desktop and mobile screens.
* **Input Validation** — Prevents invalid or empty transaction and subscription entries.

## 🛠️ Tech Stack

* **React**
* **JavaScript**
* **Vite**
* **Recharts**
* **CSS**
* **Browser localStorage**
* **Git & GitHub**

## 📊 Dashboard

FinTrack provides a centralized dashboard for monitoring personal finances, including:

* Total balance
* Total income
* Total expenses
* Savings rate
* Monthly budget
* Budget remaining
* Expense ratio
* Top spending category

## 📈 Expense Analytics

The analytics section provides a visual breakdown of expenses by category using an interactive pie chart.

Users can quickly identify their largest spending categories and understand where their money is going.

## 💳 Subscription Tracking

FinTrack also helps users keep track of recurring subscriptions.

For each subscription, the dashboard calculates:

* Number of active subscriptions
* Total monthly subscription cost
* Estimated yearly subscription cost

## 💾 Data Persistence

FinTrack uses browser `localStorage` to persist:

* Transactions
* Monthly budget
* Subscriptions

This allows data to remain available after refreshing the application on the same browser and device.

> **Note:** Because the current version uses browser localStorage, data is stored separately on each device/browser. Cross-device synchronization would require a backend database and authentication system.

## 📱 Responsive Design

The interface adapts to smaller screens with responsive layouts for:

* Dashboard cards
* Transaction forms
* Transaction controls
* Subscription information
* Analytics sections
* Mobile navigation and touch-friendly controls

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Zainab8600/FinTrack.git
```

### 2. Navigate to the project

```bash
cd FinTrack
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

The project successfully builds using Vite.

## 📁 Project Structure

```text
FinTrack/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## 🔮 Future Improvements

Potential future versions could include:

* User authentication
* Cloud database integration
* Cross-device data synchronization
* Multiple monthly budgets
* Recurring transaction automation
* Export transactions to CSV
* Advanced date-based analytics
* Dark mode
* Financial goals and savings targets
* Deployment to a public hosting platform

## 👩‍💻 Author

**Zainab Manal**

GitHub: [@Zainab8600](https://github.com/Zainab8600)

---

Built with React and a focus on practical personal finance management.
