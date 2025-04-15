import { useContext } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { AddTransBtn } from "@c/ButtonComp/AddTransBtn/AddTransBtn";
import "./overview.css";
import { FetchTransactionsContext } from "@c/Context/Context";

export function Overview({ date }) {
  const { selectTransactions } = useContext(FetchTransactionsContext);

  const currentTransactions = selectTransactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return txDate >= new Date(date.from) && txDate <= new Date(date.to);
  });

  const calcIncome = currentTransactions
    .filter((incomeTransactions) => incomeTransactions.amount >= 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcExpenses = currentTransactions
    .filter((expensTransactions) => expensTransactions.amount < 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcRemaining = calcIncome + calcExpenses;

  const lastMonthTransactions = selectTransactions.filter((tx) => {
    const currentMonth = new Date();

    const firstDayInPreviousMonth = new Date(
      Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    ).toISOString();

    const lastDayInPreviousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).toISOString();

    const lastMonthTx = new Date(tx.date);
    return (
      lastMonthTx >= new Date(firstDayInPreviousMonth) &&
        lastMonthTx <= new Date(lastDayInPreviousMonth),
      1
    );
  });

  const calcIncomeLastMonth = lastMonthTransactions
    .filter((incomeTransactions) => incomeTransactions.amount >= 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcExpensesLastMonth = lastMonthTransactions
    .filter((expensTransactions) => expensTransactions.amount < 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcRemainingLastMonth = calcIncome + calcExpenses;

  console.log(
    "calcIncomeLastMonth",
    calcIncomeLastMonth,
    "calcExpensesLastMonth",
    calcExpensesLastMonth,
    "calcRemainingLastMonth",
    calcRemainingLastMonth,
    lastMonthTransactions
  );

  return (
    <div className="overview-container">
      <div className="welcome-text">
        <h1 className="text-4xl">Welcome Back, Name</h1>
        <p className="text-lg">This is your Finacial Overview Report</p>
      </div>

      <div className="overviwe-wrapper">
        <div className="overview-card remaing">
          <div className="card-header">
            <h2 className="text-2xl">Remaining</h2>
            <SavingsIcon className="stat-icons save-icon" />
          </div>
          <p
            className={`${calcRemaining <= 0 ? "text-red-500" : "text-green-500"} text-xl`}
          >
            {calcRemaining} €
          </p>

          <p>10% from last period</p>
        </div>

        <div className="overview-card income">
          <div className="card-header">
            <h2 className="text-2xl">Income</h2>
            <TrendingUpIcon className="stat-icons up-icon" />
          </div>
          <p className="text-xl text-green-500">{calcIncome} €</p>
          <p>10% from last period</p>
        </div>

        <div className="overview-card outcome">
          <div className="card-header">
            <h2 className="text-2xl">Expenses</h2>
            <TrendingDownIcon className="stat-icons down-icon" />
          </div>
          <p className="text-xl text-red-500">{Math.abs(calcExpenses)} €</p>
          <p>10% from last period</p>
        </div>

        <AddTransBtn />
      </div>
    </div>
  );
}
