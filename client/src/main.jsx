import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  OtpRoute,
  ProtectedRoute,
  VerificationRoute,
} from "@c/Auth/ProtectedRoute/ProtectedRoute";
import { Dashboard } from "@c/Dashboard/Dashboard";
import { Transactions } from "@c/Transaction/Transactions";
import { GetAuthenticationProvider } from "@c/Context/AuthContext";
import { GetTransactionsProvider } from "@c/Context/Context";
import { Login } from "@c/Auth/Sign-Authentication/Login";
import { Register } from "@c/Auth/Sign-Authentication/Register";
import { OneTimeOtp } from "@c/Auth/OTP/OneTimeOtp";
import { Verification } from "@c/Auth/Verification/Verification";
import { GuestRoute } from "@c/Auth/ProtectedRoute/ProtectedRoute";
import { ForgotPw } from "@c/Auth/OTP/Forgotpw";
import { App } from "./App";
import { Toaster } from "sonner";
import { ChangePasswordPage } from "@c/Auth/ChangePassword/ChangePasswordPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  {
    path: "/reset-password-authentication",
    element: <ForgotPw />,
  },
  {
    path: "/verifyUser",
    element: (
      <VerificationRoute>
        <Verification />
      </VerificationRoute>
    ),
  },
  {
    path: "/One-Time-Otp",
    element: (
      <OtpRoute>
        <OneTimeOtp />
      </OtpRoute>
    ),
  },
  {
    path: "/change-password",
    element: (
      <OtpRoute>
        <ChangePasswordPage />
      </OtpRoute>
    ),
  },
  {
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GetAuthenticationProvider>
    <GetTransactionsProvider>
      <Toaster />
      <RouterProvider router={router} />
    </GetTransactionsProvider>
  </GetAuthenticationProvider>
);
