import { useContext } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { AddTransBtn } from "@c/ButtonComp/AddTransBtn/AddTransBtn";
import "./overview.css";
import { GetTransactionsContext } from "@c/Context/Context";

export function Overview() {
  const { selectTransactions } = useContext(GetTransactionsContext);

  const calcIncome = selectTransactions
    .filter((incomeTransactions) => incomeTransactions.amount >= 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcExpenses = selectTransactions
    .filter((expensTransactions) => expensTransactions.amount < 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcRemaining = calcIncome + calcExpenses;

  return (
    <div className="overview-container">
      <div className="welcome-text">
        <h1>Welcome Back, Name</h1>
        <p>This is your Finacial Overview Report</p>
      </div>

      <div className="overviwe-wrapper">
        <div className="overview-card remaing">
          <div className="card-header">
            <h2>Remaining</h2>
            <SavingsIcon className="stat-icons save-icon" />
          </div>
          <p className={calcRemaining <= 0 ? "text-red-500" : "text-green-500"}>
            {calcRemaining} €
          </p>
          <p>10% from last period</p>
        </div>

        <div className="overview-card income">
          <div className="card-header">
            <h2>Income</h2>
            <TrendingUpIcon className="stat-icons up-icon" />
          </div>
          <p className="text-green-500">{calcIncome} €</p>
          <p>10% from last period</p>
        </div>

        <div className="overview-card outcome">
          <div className="card-header">
            <h2>Expenses</h2>
            <TrendingDownIcon className="stat-icons down-icon" />
          </div>
          <p className="text-red-500">{Math.abs(calcExpenses)} €</p>
          <p>10% from last period</p>
        </div>

        <AddTransBtn />
      </div>
    </div>
  );
}
