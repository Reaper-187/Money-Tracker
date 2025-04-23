import { useContext } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { AddTransBtn } from "@c/ButtonComp/AddTransBtn/AddTransBtn";
import "./overview.css";
import { FetchTransactionsContext } from "@c/Context/Context";

export function Overview({ date }) {
  const { selectTransactions } = useContext(FetchTransactionsContext);

  const rangeDateFilterTrans = selectTransactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return txDate >= new Date(date.from) && txDate <= new Date(date.to);
  });

  const calcIncome = rangeDateFilterTrans
    .filter((incomeTransactions) => incomeTransactions.amount >= 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcExpenses = rangeDateFilterTrans
    .filter((expensTransactions) => expensTransactions.amount < 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcRemaining = calcIncome + calcExpenses;

  const currentMonthTransactions = selectTransactions.filter((currentTx) => {
    const currentMonth = new Date();

    const firstDayInCurrentMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayInCurrentMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    const currentMonthTx = new Date(currentTx.date);
    return (
      currentMonthTx >= new Date(firstDayInCurrentMonth) &&
      currentMonthTx <= new Date(lastDayInCurrentMonth)
    );
  });

  const calcIncomecurrentMonth = currentMonthTransactions
    .filter((incomeTransactions) => incomeTransactions.amount >= 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcExpensescurrentMonth = currentMonthTransactions
    .filter((expensTransactions) => expensTransactions.amount < 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcRemainingcurrentMonth =
    calcIncomecurrentMonth + calcExpensescurrentMonth;

  console.log("calcRemainingcurrentMonth", calcRemainingcurrentMonth);

  const lastMonthTransactions = selectTransactions.filter((lastTx) => {
    const currentMonth = new Date();

    const firstDayInPreviousMonth = new Date(
      Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    ).toISOString();

    const lastDayInPreviousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).toISOString();

    const lastMonthTx = new Date(lastTx.date);
    return (
      lastMonthTx >= new Date(firstDayInPreviousMonth) &&
      lastMonthTx <= new Date(lastDayInPreviousMonth)
    );
  });

  const calcIncomeLastMonth = lastMonthTransactions
    .filter((incomeTransactions) => incomeTransactions.amount >= 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcExpensesLastMonth = lastMonthTransactions
    .filter((expensTransactions) => expensTransactions.amount < 0)
    .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

  const calcRemainingLastMonth = calcIncomeLastMonth + calcExpensesLastMonth;

  const remainingDifferenceInPercent =
    ((Math.abs(calcRemainingcurrentMonth) - Math.abs(calcRemainingLastMonth)) /
      Math.abs(calcRemainingLastMonth)) *
    100;

  const incomeDifferenceInPercent =
    ((Math.abs(calcIncomecurrentMonth) - Math.abs(calcIncomeLastMonth)) /
      Math.abs(calcIncomeLastMonth)) *
    100;

  const expensesDifferenceInPercent =
    ((Math.abs(calcExpensescurrentMonth) - Math.abs(calcExpensesLastMonth)) /
      Math.abs(calcExpensesLastMonth)) *
    100;

  return (
    <div className="flex flex-col items-center p-3 mt-10 md:mt-0">
      <div className="block float-left w-full py-3 text-base text-(--foreground)">
        <h1 className="text-3xl sm:text-4xl">Welcome Back, Name</h1>
        <p className="text-m sm:text-lg">
          This is your Finacial Overview Report
        </p>
      </div>

      <div className="w-full grid justify-items-center grid-cols-1 gap-5 items-center sm:grid-cols-2 lg:grid-cols-4">
        <div className="overview-card remaing">
          <div className="flex align-center justify-evenly">
            <h2 className="text-[min(8vw,1.5rem)]">Remaining</h2>
            <SavingsIcon className="stat-icons save-icon" />
          </div>
          <p
            className={`${calcRemaining <= 0 ? "text-red-500" : "text-green-500"} text-xl`}
          >
            {calcRemaining} €
          </p>

          <p>
            <span
              className={`${remainingDifferenceInPercent <= 0 ? "text-red-500" : "text-green-500"}`}
            >
              {remainingDifferenceInPercent.toFixed(2)} %
            </span>{" "}
            from last Month
          </p>
        </div>

        <div className="overview-card income">
          <div className="flex align-center justify-evenly">
            <h2 className="text-[min(8vw,1.5rem)]">Income</h2>
            <TrendingUpIcon className="stat-icons up-icon" />
          </div>
          <p className="text-xl text-green-500">{calcIncome} €</p>
          <p>
            <span
              className={`${incomeDifferenceInPercent <= 0 ? "text-red-500" : "text-green-500"}`}
            >
              {incomeDifferenceInPercent.toFixed(2)} %
            </span>{" "}
            from last Month
          </p>
        </div>

        <div className="overview-card outcome">
          <div className="flex align-center justify-evenly">
            <h2 className="text-[min(8vw,1.5rem)]">Expenses</h2>
            <TrendingDownIcon className="stat-icons down-icon" />
          </div>
          <p className="text-xl text-red-500">{Math.abs(calcExpenses)} €</p>
          <p>
            <span
              className={`${remainingDifferenceInPercent <= 0 ? "text-red-500" : "text-green-500"}`}
            >
              {expensesDifferenceInPercent.toFixed(2)} %
            </span>{" "}
            from last Month
          </p>
        </div>

        <div className="w-full flex justify-center">
          <AddTransBtn />
        </div>
      </div>
    </div>
  );
}
