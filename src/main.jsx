import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Login } from "@c/Auth/Login";
import { Register } from "@c/Auth/Register";
import { Dashboard } from "@c/Dashboard/Dashboard";
import { Transactions } from "@c/Transaction/Transactions";
import { OneTimeOtp } from "@c/Auth/OTP/OneTimeOtp";
import {
  ProtectedRoute,
  VerificationRoute,
} from "@c/Auth/ProtectedRoute/ProtectedRoute";
import { GetAuthenticationProvider } from "@c/Context/AuthContext";
import { GuestRoute } from "@c/Auth/ProtectedRoute/ProtectedRoute";
import { App } from "./App";
import { Toaster } from "sonner";
import "./index.css";
import { Verification } from "@c/Auth/Verification/Verification";

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
    path: "/verify",
    element: (
      <VerificationRoute>
        <Verification />,
      </VerificationRoute>
    ),
  },
  {
    path: "/OneTimeOtp",
    element: <OneTimeOtp />,
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
