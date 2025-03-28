import React from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { AddTransBtn } from "../Button/AddTransBtn/AddTransBtn";
import "./overview.scss";

export function Overview() {
  return (
    <div className="overview-container">
      <div className="welcome-text">
        <h1>Welcome Back, Name</h1>
        <p>This is your Finacial Overview Report</p>
      </div>
      <div className="overviwe-wrapper">
        <div className="overview-card remaing">
          <div className="card-header">
            <h2>Remaining</h2>
            <SavingsIcon className="stat-icons save-icon" />
          </div>
          <p>0,00 €</p>
          <p>10% from last period</p>
        </div>

        <div className="overview-card income">
          <div className="card-header">
            <h2>Income</h2>
            <TrendingDownIcon className="stat-icons down-icon" />
          </div>
          <p>0,00 €</p>
          <p>10% from last period</p>
        </div>

        <div className="overview-card outcome">
          <div className="card-header">
            <h2>Expenses</h2>
            <TrendingUpIcon className="stat-icons up-icon" />
          </div>
          <p>0,00 €</p>
          <p>10% from last period</p>
        </div>

        <AddTransBtn />
      </div>
    </div>
  );
}
