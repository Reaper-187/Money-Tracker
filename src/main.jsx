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
import { Login } from "@c/Auth/Sign-Authentication/Login";
import { Register } from "@c/Auth/Sign-Authentication/Register";
import { OneTimeOtp } from "@c/Auth/OTP/OneTimeOtp";
import { Verification } from "@c/Auth/Verification/Verification";
import { GuestRoute } from "@c/Auth/ProtectedRoute/ProtectedRoute";
import { Forgotpw } from "@c/Auth/OTP/Forgotpw";
import { App } from "./App";
import { Toaster } from "sonner";
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
    path: "/Reset-Password-Authentication",
    element: (
      <GuestRoute>
        <Forgotpw />
      </GuestRoute>
    ),
  },
  {
    path: "/verify",
    element: (
      <VerificationRoute>
        <Verification />,
      </VerificationRoute>
    ),
  },
  {
    path: "/OneTimeOtp",
    element: (
      <OtpRoute>
        <OneTimeOtp />,
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
            <Dashboard />,
          </ProtectedRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute>
            <Transactions />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GetAuthenticationProvider>
    <Toaster />
    <RouterProvider router={router} />
  </GetAuthenticationProvider>
);
