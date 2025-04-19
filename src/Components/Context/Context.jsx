import { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // damit erlaube ich das senden von cookies
const transactions = import.meta.env.VITE_API_TRANSACTIONS;

export const FetchTransactionsContext = createContext();

export const GetTransactionsProvider = ({ children }) => {
  const [selectTransactions, setSelectTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(transactions);
      const transactionsDataArray = response.data.eachTransaction;
      const sortByDate = transactionsDataArray.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setSelectTransactions(sortByDate);
    } catch (err) {
      console.error("GET-Data not found", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <FetchTransactionsContext.Provider
      value={{
        selectTransactions,
        setSelectTransactions,
        fetchTransactions,
      }}
    >
      {children}
    </FetchTransactionsContext.Provider>
  );
};
