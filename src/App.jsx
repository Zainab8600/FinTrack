import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import './App.css'
function App() {
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false)
  const [subscriptionName, setSubscriptionName] = useState('')
  const [subscriptionAmount, setSubscriptionAmount] = useState('')

  const [subscriptions, setSubscriptions] = useState(() => {
    const savedSubscriptions = localStorage.getItem(
      'fintrack-subscriptions'
    )

    if (savedSubscriptions) {
      return JSON.parse(savedSubscriptions)
    }

    return [
      {
        name: 'Netflix',
        amount: 649,
        billing: 'Monthly',
      },
      {
        name: 'Spotify',
        amount: 119,
        billing: 'Monthly',
      },
      {
        name: 'Amazon Prime',
        amount: 299,
        billing: 'Monthly',
      },
    ]
  })

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(
      'fintrack-transactions'
    )

    if (savedTransactions) {
      return JSON.parse(savedTransactions)
    }

    return [
      {
        name: 'Grocery Shopping',
        amount: 2450,
        type: 'expense',
        category: 'Groceries',
        date: 'Today',
      },
      {
        name: 'Salary',
        amount: 35000,
        type: 'income',
        category: 'Salary',
        date: 'Aug 15',
      },
      {
        name: 'Netflix',
        amount: 649,
        type: 'expense',
        category: 'Entertainment',
        date: 'Aug 12',
      },
    ]
  })

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('')

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const savedBudget = localStorage.getItem('fintrack-budget')

    return savedBudget ? Number(savedBudget) : 20000
  })

  useEffect(() => {
    localStorage.setItem(
      'fintrack-transactions',
      JSON.stringify(transactions)
    )
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(
      'fintrack-subscriptions',
      JSON.stringify(subscriptions)
    )
  }, [subscriptions])

  useEffect(() => {
    localStorage.setItem(
      'fintrack-budget',
      monthlyBudget.toString()
    )
  }, [monthlyBudget])

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    )

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    )

  const balance = totalIncome - totalExpenses

  const budgetPercentage =
    monthlyBudget > 0
      ? Math.min((totalExpenses / monthlyBudget) * 100, 100)
      : 0

  const savingsRate =
    totalIncome > 0
      ? ((balance / totalIncome) * 100).toFixed(1)
      : 0
      const expenseTransactions = transactions.filter(
  (transaction) => transaction.type === 'expense'
)

const expenseCount = expenseTransactions.length

const averageExpense =
  expenseCount > 0
    ? totalExpenses / expenseCount
    : 0

const largestExpense =
  expenseCount > 0
    ? Math.max(
        ...expenseTransactions.map(
          (transaction) => transaction.amount
        )
      )
    : 0

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch = transaction.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesFilter =
        filterType === 'all' ||
        transaction.type === filterType

      return matchesSearch && matchesFilter
    }
  )

  const monthlySubscriptions = subscriptions
    .filter(
      (subscription) => subscription.billing === 'Monthly'
    )
    .reduce(
      (total, subscription) =>
        total + subscription.amount,
      0
    )
    const yearlySubscriptions =
  monthlySubscriptions * 12
  const subscriptionCount = subscriptions.length

  const categoryTotals = transactions
    .filter(
      (transaction) => transaction.type === 'expense'
    )
    .reduce((totals, transaction) => {
      const categoryName =
        transaction.category || 'Other'

      totals[categoryName] =
        (totals[categoryName] || 0) +
        transaction.amount

      return totals
    }, {})
    const chartColors = [
  '#7FAF8F',
  '#D9A441',
  '#D98282',
  '#8FA7C7',
  '#B49AC8',
  '#D69B6D',
  '#7FB5B3',
  '#A7B58A',
]
    const chartData = Object.entries(categoryTotals).map(
  ([category, total]) => ({
    name: category,
    value: total,
  })
)
const topCategory = chartData.length > 0
  ? chartData.reduce((highest, current) =>
      current.value > highest.value ? current : highest
    )
  : null
    const remainingBudget =
    Math.max(monthlyBudget - totalExpenses, 0)

  const savingsAmount = Math.max(balance, 0)

  const expensePercentage =
    totalIncome > 0
      ? ((totalExpenses / totalIncome) * 100).toFixed(1)
      : 0
    

   

  const addTransaction = (event) => {
    event.preventDefault()

    if (!name.trim() || !amount || Number(amount) <= 0) return

    const transactionData = {
      name,
      amount: Number(amount),
      type,
      category,
      date: date || 'Today',
    }

    if (editingTransaction) {
      setTransactions(
        transactions.map((transaction) =>
          transaction === editingTransaction
            ? transactionData
            : transaction
        )
      )
    } else {
      setTransactions([
        transactionData,
        ...transactions,
      ])
    }

    setName('')
    setAmount('')
    setType('expense')
    setCategory('Food')
    setDate('')
    setEditingTransaction(null)
    setShowForm(false)
  }

  const startEditing = (transaction) => {
    setEditingTransaction(transaction)

    setName(transaction.name)
    setAmount(transaction.amount)
    setType(transaction.type)
    setCategory(transaction.category || 'Other')
    setDate(
      transaction.date === 'Today'
        ? ''
        : transaction.date
    )

    setShowForm(true)
  }

  const deleteTransaction = (transactionToDelete) => {
    setTransactions(
      transactions.filter(
        (transaction) =>
          transaction !== transactionToDelete
      )
    )

    if (editingTransaction === transactionToDelete) {
      setEditingTransaction(null)
      setShowForm(false)
    }
  }

  const addSubscription = (event) => {
    event.preventDefault()

    if (
  !subscriptionName.trim() ||
  !subscriptionAmount ||
  Number(subscriptionAmount) <= 0
) return

    const newSubscription = {
      name: subscriptionName,
      amount: Number(subscriptionAmount),
      billing: 'Monthly',
    }

    setSubscriptions([
      ...subscriptions,
      newSubscription,
    ])

    setSubscriptionName('')
    setSubscriptionAmount('')
    setShowSubscriptionForm(false)
  }

  const deleteSubscription = (indexToDelete) => {
    setSubscriptions(
      subscriptions.filter(
        (_, index) => index !== indexToDelete
      )
    )
  }

  const closeTransactionForm = () => {
    setShowForm(false)
    setEditingTransaction(null)
    setName('')
    setAmount('')
    setType('expense')
    setCategory('Food')
    setDate('')
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1>FinTrack</h1>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#transactions">Transactions</a>
          <a href="#subscriptions">Subscriptions</a>
        </nav>
      </header>

      <main className="dashboard" id="dashboard">

        <section className="welcome">
          <p className="eyebrow">
            PERSONAL FINANCE
          </p>

          <h2>
            Take control of your money.
          </h2>

          <p>
            Track your spending, understand your
            habits, and stay on top of your monthly
            finances.
          </p>
        </section>

        <section className="summary">

          <div className="card">
            <p>Total Balance</p>
            <h3>
              ₹{balance.toLocaleString('en-IN')}
            </h3>
          </div>

          <div className="card">
            <p>Total Income</p>
            <h3>
              ₹{totalIncome.toLocaleString('en-IN')}
            </h3>
          </div>

          <div className="card">
            <p>Total Expenses</p>
            <h3>
              ₹{totalExpenses.toLocaleString('en-IN')}
            </h3>
          </div>

          <div className="card">
            <p>Savings Rate</p>
            <h3>{savingsRate}%</h3>
          </div>

          <div className="card">
            <p>Monthly Budget</p>

            <h3>
              ₹{monthlyBudget.toLocaleString('en-IN')}
            </h3>

            <span>
  {totalExpenses > monthlyBudget
    ? 'Over budget'
    : budgetPercentage >= 80
    ? 'Approaching budget limit'
    : 'Within budget'}
</span>

            {totalExpenses > monthlyBudget ? (
              <p className="budget-warning">
                You've exceeded your monthly budget.
              </p>
            ) : budgetPercentage >= 80 ? (
              <p className="budget-warning">
                You're approaching your monthly budget.
              </p>
            ) : (
              <p className="budget-safe">
                You're within your monthly budget.
              </p>
            )}

            <div className="budget-progress">
              <div
                className="budget-progress-fill"
                style={{
                  width: `${budgetPercentage}%`,
                }}
              ></div>
            </div>

            <input
              type="number"
              value={monthlyBudget}
              onChange={(event) =>
                setMonthlyBudget(
                  Number(event.target.value)
                )
              }
              placeholder="Set monthly budget"
            />
          </div>
          </section>
                  <section className="financial-overview">

          <div className="section-heading">
            <h2>Financial Overview</h2>
          </div>

                   <div className="overview-grid">

            <div className="overview-card">
              <span>Money Saved</span>
              <strong>
                ₹{savingsAmount.toLocaleString('en-IN')}
              </strong>
            </div>

            <div className="overview-card">
              <span>Budget Remaining</span>

              <strong>
                ₹{remainingBudget.toLocaleString('en-IN')}
              </strong>

              <small
                className={
                  totalExpenses > monthlyBudget
                    ? 'budget-status-danger'
                    : budgetPercentage >= 80
                    ? 'budget-status-warning'
                    : 'budget-status-safe'
                }
              >
                {totalExpenses > monthlyBudget
                  ? 'Budget exceeded'
                  : budgetPercentage >= 80
                  ? 'Getting close to limit'
                  : 'Available to spend'}
              </small>
            </div>

            <div className="overview-card">
              <span>Expense Ratio</span>
              <strong>{expensePercentage}%</strong>
            </div>

          </div>

          

        </section>

<section className="analytics">
  <div className="section-heading">
    <h2>Expense Analytics</h2>
  </div>

  {chartData.length === 0 ? (
    <p>No expense data available yet.</p>
  ) : (
    <div className="chart-container">
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
  key={`cell-${index}`}
  fill={chartColors[index % chartColors.length]}
/>
          ))}
        </Pie>

        <Tooltip
          formatter={(value) =>
            `₹${Number(value).toLocaleString('en-IN')}`
          }
        />

        <Legend />
      </PieChart>
    </div>
  )}
  {topCategory && (
  <div className="top-category">
    <strong>Top Spending Category</strong>
    <span>
      {topCategory.name} · ₹
      {topCategory.value.toLocaleString('en-IN')}
    </span>
  </div>
)}
<div className="spending-insight">
  <strong>Monthly Spending</strong>
  <span>
    ₹{totalExpenses.toLocaleString('en-IN')} spent this month
  </span>
</div>
<div className="spending-insight">
  <strong>Budget Status</strong>
  <span>
    {budgetPercentage.toFixed(0)}% of budget used
  </span>
</div>
</section>
<section className="monthly-summary">

  <div className="section-heading">
    <h2>Monthly Spending Summary</h2>
  </div>

  <div className="monthly-summary-grid">

    <div className="summary-card">
      <span>Total Spent</span>
      <strong>
        ₹{totalExpenses.toLocaleString('en-IN')}
      </strong>
    </div>

    <div className="summary-card">
      <span>Number of Expenses</span>
      <strong>
        {expenseCount}
      </strong>
    </div>

    <div className="summary-card">
      <span>Average Expense</span>
      <strong>
        ₹{Math.round(averageExpense).toLocaleString('en-IN')}
      </strong>
    </div>

    <div className="summary-card">
      <span>Largest Expense</span>
      <strong>
        ₹{largestExpense.toLocaleString('en-IN')}
      </strong>
    </div>

  </div>

</section>

<section className="category-breakdown">

        

          <div className="section-heading">
            <h2>Spending by Category</h2>
          </div>

          {Object.keys(categoryTotals).length === 0 ? (
            <p>No expenses yet.</p>
          ) : (
            <div className="category-list">

              {Object.entries(categoryTotals).map(
                ([categoryName, total]) => {

                  const percentage =
                    totalExpenses > 0
                      ? (total / totalExpenses) * 100
                      : 0

                  return (
                    <div
                      className="category-item"
                      key={categoryName}
                    >

                      <div className="category-info">
                        <span>
                          {categoryName}
                        </span>

                        <strong>
                          ₹{total.toLocaleString(
                            'en-IN'
                          )}
                        </strong>
                      </div>

                      <div className="category-bar">
                        <div
                          className="category-bar-fill"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>

                    </div>
                  )
                }
              )}

            </div>
          )}

        </section>

        <section
          className="transactions"
          id="transactions"
        >

          <div className="section-heading">

            <h2>Recent Transactions</h2>

            <button
              onClick={() => {
                if (showForm) {
                  closeTransactionForm()
                } else {
                  setShowForm(true)
                }
              }}
            >
              {showForm
                ? 'Close'
                : 'Add Transaction'}
            </button>

          </div>

          <div className="transaction-controls">

            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <select
              value={filterType}
              onChange={(event) =>
                setFilterType(event.target.value)
              }
            >
              <option value="all">
                All
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expenses
              </option>
            </select>

          </div>

          {showForm && (
            <form
              className="transaction-form"
              onSubmit={addTransaction}
            >

              <input
                type="text"
                placeholder="Transaction name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
              />

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
              />

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value)
                }
              >
                <option value="expense">
                  Expense
                </option>

                <option value="income">
                  Income
                </option>
              </select>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                <option value="Food">
                  Food
                </option>

                <option value="Groceries">
                  Groceries
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Bills">
                  Bills
                </option>

                <option value="Shopping">
                  Shopping
                </option>

                <option value="Entertainment">
                  Entertainment
                </option>

                <option value="Salary">
                  Salary
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <button type="submit">
                {editingTransaction
                  ? 'Update Transaction'
                  : 'Save Transaction'}
              </button>

            </form>
          )}

          <div className="transaction-list">

            {filteredTransactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              filteredTransactions.map(
                (transaction, index) => (

                  <div
                    className="transaction"
                    key={index}
                  >

                    <div>
                      <strong>
                        {transaction.name}
                      </strong>

                      <span>
                        {transaction.category ||
                          'Other'}{' '}
                        •{' '}

                        {transaction.date === 'Today'
                          ? 'Today'
                          : new Date(
                              transaction.date
                            ).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                      </span>
                    </div>

                    <div className="transaction-right">
                      <span
                        className={
                          transaction.type === 'income'
                            ? 'transaction-badge income-badge'
                            : 'transaction-badge expense-badge'
                        }
                      >
                        {transaction.type === 'income'
                          ? 'Income'
                          : 'Expense'}
                      </span>
                      <p
                        className={
                          transaction.type ===
                          'income'
                            ? 'income'
                            : ''
                        }
                      >
                        {transaction.type ===
                        'income'
                          ? '+'
                          : '-'}{' '}
                        ₹
                        {transaction.amount.toLocaleString(
                          'en-IN'
                        )}
                      </p>

                      <button
                        className="edit-button"
                        onClick={() =>
                          startEditing(
                            transaction
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteTransaction(
                            transaction
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                )
              )
            )}

          </div>

        </section>

        <section
          className="subscriptions"
          id="subscriptions"
        >

          <div className="section-heading">

            <h2>Subscriptions</h2>

            <div>

             <div className="subscription-summary">
  <span>
    {subscriptionCount} active subscription
    {subscriptionCount !== 1 ? 's' : ''}
  </span>

  <span>
    ₹{monthlySubscriptions.toLocaleString('en-IN')} / month
  </span>

  <small>
    ₹{yearlySubscriptions.toLocaleString('en-IN')} / year
  </small>
</div>

              <button
                onClick={() =>
                  setShowSubscriptionForm(
                    !showSubscriptionForm
                  )
                }
              >
                {showSubscriptionForm
                  ? 'Close'
                  : 'Add Subscription'}
              </button>

            </div>

          </div>

          {showSubscriptionForm && (
            <form
              className="transaction-form"
              onSubmit={addSubscription}
            >

              <input
                type="text"
                placeholder="Subscription name"
                value={subscriptionName}
                onChange={(event) =>
                  setSubscriptionName(
                    event.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="Monthly amount"
                value={subscriptionAmount}
                onChange={(event) =>
                  setSubscriptionAmount(
                    event.target.value
                  )
                }
              />

              <button type="submit">
                Save Subscription
              </button>

            </form>
          )}

          <div className="subscription-list">

            {subscriptions.map(
              (subscription, index) => (

                <div
                  className="subscription"
                  key={index}
                >

                  <div>
                    <strong>
                      {subscription.name}
                    </strong>

                    <span>
                      {subscription.billing}
                    </span>
                  </div>

                  <div>

                    <strong>
                      ₹
                      {subscription.amount.toLocaleString(
                        'en-IN'
                      )}
                    </strong>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteSubscription(
                          index
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

      </main>
    </div>
  )
}

export default App