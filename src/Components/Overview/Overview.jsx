import { useContext, useEffect, useMemo, useState } from "react";
import { AddTransBtn } from "@c/ButtonComp/AddTransBtn/AddTransBtn";
import { FetchTransactionsContext } from "@c/Context/Context";
import { startOfDay, endOfDay } from "date-fns";
import { PercentageMotion } from "@c/NumberAnimation/NumberAnimation";
import { motion } from "motion/react";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NumberFlow from "@number-flow/react";

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
      try {
        const res = await axios.get(getUserInfo);
        setUserInfo(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Userdaten:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const { selectTransactions } = useContext(FetchTransactionsContext);

  const {
    calcIncomeCurrentMonth,
    calcExpensesCurrentMonth,
    calcRemainingCurrentMonth,
  } = useMemo(() => {
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

    const calcRemainingCurrentMonth = income + expenses;

    return {
      calcIncomeCurrentMonth: income,
      calcExpensesCurrentMonth: expenses,
      calcRemainingCurrentMonth,
    };
  }, [selectTransactions, date.from, date.to]);

  const { calcIncomeLastMonth, calcExpensesLastMonth, calcRemainingLastMonth } =
    useMemo(() => {
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

      const calcRemainingLastMonth =
        calcIncomeLastMonth + calcExpensesLastMonth;

      return {
        calcIncomeLastMonth,
        calcExpensesLastMonth,
        calcRemainingLastMonth,
      };
    }, [selectTransactions]);

  const newCalcRemaining = calcRemainingLastMonth + calcRemainingCurrentMonth;

  const remainingDifferenceInPercent =
    calcRemainingLastMonth !== 0
      ? ((Math.abs(calcRemainingCurrentMonth) -
          Math.abs(calcRemainingLastMonth)) /
          Math.abs(calcRemainingLastMonth)) *
        100
      : 0;

  const incomeDifferenceInPercent =
    calcIncomeLastMonth !== 0
      ? ((Math.abs(calcIncomeCurrentMonth) - Math.abs(calcIncomeLastMonth)) /
          Math.abs(calcIncomeLastMonth)) *
        100
      : 0;

  const expensesDifferenceInPercent =
    calcExpensesLastMonth !== 0
      ? ((Math.abs(calcExpensesCurrentMonth) -
          Math.abs(calcExpensesLastMonth)) /
          Math.abs(calcExpensesLastMonth)) *
        100
      : 0;

  const currencyFormatter = {
    style: "currency",
    currency: "EUR",
  };

  const percentageFormatter = {
    style: "percent",
    signDisplay: "always",
  };

  return (
    <div className="flex flex-col items-center p-3 mt-10 md:mt-0">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.25 }}
        className="relative block float-left w-full py-4 text-base text-[--foreground]"
      >
        <h1 className="lg:text-5xl md: text-2xl">
          Welcome back, {userInfo?.name}
        </h1>
        <p className="sm:text-lg lg:text-2xl">
          This is your Financial Overview Report
        </p>
      </motion.div>

      <div className="w-7xl grid justify-items-center grid-cols-1 gap-5 items-center sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              x: 10,
            },
            visible: { opacity: 1, x: 0, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
          className="overview-card"
        >
          <div className="w-full flex align-center justify-evenly">
            <h2 className="text-[min(8vw,1.5rem)]">Remaining</h2>
            <SavingsIcon className="stat-icons save-icon" />
          </div>
          <NumberFlow
            className={`${newCalcRemaining <= 0 ? "text-red-500" : "text-green-500"} text-xl`}
            value={newCalcRemaining}
            format={currencyFormatter}
          />

          <PercentageMotion value={remainingDifferenceInPercent} />
        </motion.div>

        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              x: 10,
            },
            visible: { opacity: 1, x: 0, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.35 }}
          className="overview-card income"
        >
          <div className="w-full flex align-center justify-evenly">
            <h2 className="text-[min(8vw,1.5rem)]">Income</h2>
            <TrendingUpIcon className="stat-icons up-icon" />
          </div>
          <NumberFlow
            className={`${calcIncomeCurrentMonth <= 0 ? "text-red-500" : "text-green-500"} text-xl`}
            value={calcIncomeCurrentMonth}
            format={currencyFormatter}
          />

          <PercentageMotion value={incomeDifferenceInPercent} />
        </motion.div>

        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              x: 10,
            },
            visible: { opacity: 1, x: 0, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.45 }}
          className="overview-card"
        >
          <div className="w-full flex align-center justify-evenly">
            <h2 className="text-[min(8vw,1.5rem)]">Expenses</h2>
            <TrendingDownIcon className="stat-icons down-icon" />
          </div>
          <NumberFlow
            className={`${calcExpensesCurrentMonth <= 0 ? "text-red-500" : "text-green-500"} text-xl`}
            value={calcExpensesCurrentMonth}
            format={currencyFormatter}
          />
          <PercentageMotion value={expensesDifferenceInPercent} />
        </motion.div>

        <div className="w-full flex justify-center">
          <AddTransBtn />
        </div>
      </div>
    </div>
  );
}
