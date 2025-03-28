import React, { useState } from "react";
import "./SelectScreen.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export function SelectScreen({ toggleSelectScreen, closeSelectScreen }) {
  const [isAdd, setIsAdd] = useState(true);

  const [infoMessage, setInfoMessage] = useState(true);

  const toggleSign = () => {
    setIsAdd((isAdd) => !isAdd);
    setInfoMessage((infoMessage) => !infoMessage);
  };

  return (
    <div
      className={
        toggleSelectScreen ? "select-container active" : "select-container"
      }
    >
      <div className="select-screen">
        <ArrowCircleRightIcon
          onClick={closeSelectScreen}
          className="hide-select-screen-btn"
        />
        <h3>Add Transaction</h3>

        <lable>Date of Transaction</lable>
        <input type="date" className="date-input" />

        <lable>Category</lable>
        <select name="" id="" className="select-option">
          <option value="Chash">Invest</option>
          <option value="Card">Entertainment</option>
          <option value="Chash">Study</option>
        </select>

        <lable>Payment</lable>
        <select name="" id="" className="select-option">
          <option value="Card">Card</option>
          <option value="Chash">Chash</option>
        </select>

        <div className="ammount-container">
          <lable>Amount</lable>
          <div className="amount-sign" onClick={toggleSign}>
            {isAdd ? (
              <AddCircleOutlineIcon className="add-plus" />
            ) : (
              <RemoveCircleOutlineIcon className="add-minus" />
            )}
          </div>
          <input
            placeholder="put in the amount"
            type="number"
            className="amount-input"
          />
          <p className="info-message">
            {infoMessage
              ? "This counted as a Income"
              : "This counted as a Outcome"}
          </p>
        </div>
        <textarea name="" id="" placeholder="Do some Notes...."></textarea>
        <button>Add Transaction</button>
      </div>
    </div>
  );
}
