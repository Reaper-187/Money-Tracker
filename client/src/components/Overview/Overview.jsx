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
import axios from "axios";
axios.defaults.withCredentials = true; // damit erlaube ich das senden von cookies
const getUserInfo = import.meta.env.VITE_API_USERINFO;

// „Nur dann useMemo, wenn du damit wirklich etwas sparst.“
// (Performance, Wiederverwendung, unnötige Re-Berechnungen)

export function Overview({ date }) {
  const [userInfo, setUserInfo] = useState(null);
  const cardStyle =
    "flex flex-col justify-start items-center rounded-[10px] shadow-[0_0_5px_0_var(--color-border)] px-2 py-4 w-full max-w-[clamp(350px,45vw,400px)] gap-4 text-[var(--foreground)] text-[var(--font-size-small)] text-center";
  const statIconStyle = "scale-[1.8] rounded-[5px] m-[0.3rem] p-[0.3rem]";

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
    <div className="flex flex-col items-center ">
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
        <h1
          className="px-3 mt-10 lg:mt-0"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
        >
          Welcome back, {userInfo?.name}
        </h1>

        <p className="px-3" style={{ fontSize: "clamp(.8rem, 2vw, 1.3rem)" }}>
          This is your Financial Overview Report
        </p>
      </motion.div>

      <div className="grid justify-items-center grid-cols-1 items-center px-3 w-full lg:grid-cols-3 gap-5">
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
          className={cardStyle}
        >
          <div className="w-full px-5 flex align-center justify-between sm:w-1/2 sm:px-0">
            <h2 className="text-[min(8vw,1.3rem)]">Remaining</h2>
            <SavingsIcon className={`${statIconStyle} bg-blue-500`} />
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
          className={cardStyle}
        >
          <div className="w-full px-5 flex align-center justify-between sm:w-1/2 sm:px-0">
            <h2 className="text-[min(6vw,1.3rem)] ">Income</h2>
            <TrendingUpIcon className={`${statIconStyle} bg-green-500`} />
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
          className={cardStyle}
        >
          <div className="w-full px-5 flex align-center justify-between sm:w-1/2 sm:px-0">
            <h2 className="text-[min(8vw,1.3rem)]">Expenses</h2>
            <TrendingDownIcon className={`${statIconStyle} bg-red-500`} />
          </div>
          <NumberFlow
            className={`${calcExpensesCurrentMonth <= 0 ? "text-red-500" : "text-green-500"} text-xl`}
            value={calcExpensesCurrentMonth}
            format={currencyFormatter}
          />
          <PercentageMotion value={expensesDifferenceInPercent} />
        </motion.div>
      </div>
      <div className="flex justify-center mt-4 sm:w-full">
        <AddTransBtn />
      </div>
    </div>
  );
}
