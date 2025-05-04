import { useContext, useEffect, useMemo, useState } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { AddTransBtn } from "@c/ButtonComp/AddTransBtn/AddTransBtn";
import { FetchTransactionsContext } from "@c/Context/Context";
import { startOfDay, endOfDay } from "date-fns";

import "./overview.css";
import axios from "axios";

axios.defaults.withCredentials = true; // damit erlaube ich das senden von cookies
const getUserInfo = import.meta.env.VITE_API_USERINFO;

// „Nur dann useMemo, wenn du damit wirklich etwas sparst.“
// (Performance, Wiederverwendung, unnötige Re-Berechnungen)

export function Overview({ date }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get(getUserInfo);
      setUserInfo(res.data);
    };
    fetchUserInfo();
  }, []);

  const { selectTransactions } = useContext(FetchTransactionsContext);

  const { calcIncome, calcExpenses } = useMemo(() => {
    const rangeDateFilterTrans = selectTransactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        txDate >= startOfDay(new Date(date.from)) &&
        txDate <= endOfDay(new Date(date.to))
      );
    });

    const income = rangeDateFilterTrans
      .filter((incomeTransactions) => incomeTransactions.amount >= 0)
      .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

    const expenses = rangeDateFilterTrans
      .filter((expensTransactions) => expensTransactions.amount < 0)
      .reduce((acc, currentAmount) => acc + currentAmount.amount, 0);

    return {
      calcIncome: income,
      calcExpenses: expenses,
    };
  }, [selectTransactions, date.from, date.to]);

  const currentMonthTransactions = useMemo(() => {
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

    return selectTransactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        txDate >= firstDayInCurrentMonth && txDate <= lastDayInCurrentMonth
      );
    });
  }, [selectTransactions]);

  const { calcIncomeCurrentMonth, calcExpensesCurrentMonth } = useMemo(() => {
    const income = currentMonthTransactions.reduce(
      (acc, tx) => (tx.amount >= 0 ? acc + tx.amount : acc),
      0
    );

    const expenses = currentMonthTransactions.reduce(
      (acc, tx) => (tx.amount < 0 ? acc + tx.amount : acc),
      0
    );

    return {
      calcIncomeCurrentMonth: income,
      calcExpensesCurrentMonth: expenses,
    };
  }, [currentMonthTransactions]);

  const calcRemainingcurrentMonth =
    calcIncomeCurrentMonth + calcExpensesCurrentMonth;

  const {
    lastMonthTransactions,
    calcIncomeLastMonth,
    calcExpensesLastMonth,
    calcRemainingLastMonth,
  } = useMemo(() => {
    const currentMonth = new Date();

    const firstDayInPreviousMonth = new Date(
      Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

    const lastDayInPreviousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    );

    const lastMonthTransactions = selectTransactions.filter((lastTx) => {
      const lastMonthTx = new Date(lastTx.date);
      return (
        lastMonthTx >= firstDayInPreviousMonth &&
        lastMonthTx <= lastDayInPreviousMonth
      );
    });

    const calcIncomeLastMonth = lastMonthTransactions
      .filter((tx) => tx.amount >= 0)
      .reduce((acc, tx) => acc + tx.amount, 0);

    const calcExpensesLastMonth = lastMonthTransactions
      .filter((tx) => tx.amount < 0)
      .reduce((acc, tx) => acc + tx.amount, 0);

    const calcRemainingLastMonth = calcIncomeLastMonth + calcExpensesLastMonth;

    return {
      lastMonthTransactions,
      calcIncomeLastMonth,
      calcExpensesLastMonth,
      calcRemainingLastMonth,
    };
  }, [selectTransactions]);

  const remainingDifferenceInPercent =
    ((Math.abs(calcRemainingcurrentMonth) - Math.abs(calcRemainingLastMonth)) /
      Math.abs(calcRemainingLastMonth)) *
    100;

  const incomeDifferenceInPercent =
    ((Math.abs(calcIncomeCurrentMonth) - Math.abs(calcIncomeLastMonth)) /
      Math.abs(calcIncomeLastMonth)) *
    100;

  const expensesDifferenceInPercent =
    ((Math.abs(calcExpensesCurrentMonth) - Math.abs(calcExpensesLastMonth)) /
      Math.abs(calcExpensesLastMonth)) *
    100;

  return (
    <div className="flex flex-col items-center p-3 mt-10 md:mt-0">
      <div className="block float-left w-full py-3 text-base text-(--foreground)">
        <h1 className="text-3xl sm:text-4xl">Welcome back, {userInfo?.name}</h1>
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
            className={`${newCalcRemaining <= 0 ? "text-red-500" : "text-green-500"} text-xl`}
          >
            {newCalcRemaining} €
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
