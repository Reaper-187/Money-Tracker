import { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // damit erlaube ich das senden von cookies
const transactions = import.meta.env.VITE_API_TRANSACTIONS;

export const GetTransactionsContext = createContext();

export const GetTransactionsProvider = ({ children }) => {
  const [selectTransactions, setSelectTransactions] = useState([]);

  useEffect(() => {
    const GetTransactionsData = async () => {
      try {
        const response = await axios.get(transactions);
        const transactionsDataArray = response.data.eachTransaction;
        setSelectTransactions(transactionsDataArray);
      } catch (err) {
        console.error("GET-Data not found", err);
      }
    };
    GetTransactionsData();
  }, []);

  return (
    <GetTransactionsContext.Provider
      value={{ selectTransactions, setSelectTransactions }}
    >
      {children}
    </GetTransactionsContext.Provider>
  );
};
