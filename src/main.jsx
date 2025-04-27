import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { App } from "./App";
import { Login } from "@c/Auth/Login";
import { Register } from "@c/Auth/Register";
import { Dashboard } from "@c/Dashboard/Dashboard";
import { Transactions } from "@c/Transaction/Transactions";
import { Toaster } from "sonner";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "transactions", element: <Transactions /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);

// import { ErrorPage } from './components/ErrorPage';
// import { Loader } from './components/Loader/Loader';
// import { VerifyPage } from './components/VerifyPage';

// Zustand für Authentifizierung verwalten
// const ProtectedLayout = () => {
//   const { isAuthenticated } = useContext(CheckAuthContext);
//   if (isAuthenticated === null) return <Loader />;
//   return isAuthenticated ? <App /> : <Navigate to="/login" />;
// };

// const LoginRoute = () => {
//   const { isAuthenticated } = useContext(CheckAuthContext);
//   if (isAuthenticated === null) return <Loader />;
//   return isAuthenticated ? <Navigate to="/dashboard" /> : <Login />;
// };

// {
//   path: "/verify",
//   element: <VerifyPage />,
//   errorElement: <ErrorPage />
// },
// {
//   path: "/login",
//   element: <LoginRoute />,
//   errorElement: <ErrorPage />
// },
