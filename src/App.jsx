import React from "react";
import "@fontsource/inter";
import "@fontsource/inter/600.css";

import { Outlet } from "react-router-dom";
import { Header } from "@c/Header/Header";
import { Toaster } from "sonner";
import { GetTransactionsProvider } from "@c/Context/Context";

import { OneTimeOtp } from "./components/Auth/OTP/OneTimeOtp";

export const App = () => {
  return (
    <div>
      {/* <Header /> */}
      {/* <OneTimeOtp /> */}

      {/* <GetTransactionsProvider>
        <Outlet />
      </GetTransactionsProvider>
      <Toaster /> */}
    </div>
  );
};
