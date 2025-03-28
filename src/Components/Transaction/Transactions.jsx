import React from "react";
import { AddTransBtn } from "../Button/AddTransBtn/AddTransBtn";
import "./Transactions.scss";
import { SearchBtn } from "../Button/SerachBtn/SearchBtn";
import { DeleteBtn } from "../Button/DeleteBtn/DeleteBtn";

export function Transactions() {
  return (
    <>
      <div className="transactions-container">
        <div className="history-header">
          <h2>Transaction History</h2>
          <AddTransBtn />
        </div>
        <div>
          <div className="search-header">
            <SearchBtn />
            <DeleteBtn />
          </div>

          <div className="transactions-table">
            <div className="transaction-row">
              <div>
                <ul className="sortable-header">
                  <input type="checkbox" name="" id="" />
                  <li>Date</li>
                  <li>Category</li>
                  <li>Payment</li>
                  <li>Amount</li>
                  <li>Account</li>
                </ul>
              </div>
              <div className="transaction-item">
                {/* Hier wird alles von der DB mit einem Get-Req gemappt */}
                {/* Wenn Checkbox = true => Deletebtn Anzeigen*/}
                <input type="checkbox" name="" id="" />
                <p>03 March, 2025</p>
                <p>Entertainment</p>
                <p>Merchant</p>
                <p>100€</p>
                <p>Cash</p>
                {/* Der ....btn = true => kleine pop-up-box mit Edit oder Delete gerendert werden */}
                <div className="option-btn">
                  <button>....</button>
                </div>
              </div>
              <div className="transaction-item">
                {/* Hier wird alles von der DB mit einem Get-Req gemappt */}
                {/* Wenn Checkbox = true => Deletebtn Anzeigen*/}
                <input type="checkbox" name="" id="" />
                <p>03 March, 2025</p>
                <p>Entertainment</p>
                <p>Merchant</p>
                <p>100€</p>
                <p>Cash</p>
                {/* Der ....btn = true => kleine pop-up-box mit Edit oder Delete gerendert werden */}
                <div className="option-btn">
                  <button>....</button>
                </div>
              </div>
              <div className="transaction-item">
                {/* Hier wird alles von der DB mit einem Get-Req gemappt */}
                {/* Wenn Checkbox = true => Deletebtn Anzeigen*/}
                <input type="checkbox" name="" id="" />
                <p>03 March, 2025</p>
                <p>Entertainment</p>
                <p>Merchant</p>
                <p>100€</p>
                <p>Cash</p>
                {/* Der ....btn = true => kleine pop-up-box mit Edit oder Delete gerendert werden */}
                <div className="option-btn">
                  <button>....</button>
                </div>
              </div>
              <div className="transaction-item">
                {/* Hier wird alles von der DB mit einem Get-Req gemappt */}
                {/* Wenn Checkbox = true => Deletebtn Anzeigen*/}
                <input type="checkbox" name="" id="" />
                <p>03 March, 2025</p>
                <p>Entertainment</p>
                <p>Merchant</p>
                <p>100€</p>
                <p>Cash</p>
                {/* Der ....btn = true => kleine pop-up-box mit Edit oder Delete gerendert werden */}
                <div className="option-btn">
                  <button>....</button>
                </div>
              </div>
              <div className="transaction-item">
                {/* Hier wird alles von der DB mit einem Get-Req gemappt */}
                {/* Wenn Checkbox = true => Deletebtn Anzeigen*/}
                <input type="checkbox" name="" id="" />
                <p>03 March, 2025</p>
                <p>Entertainment</p>
                <p>Merchant</p>
                <p>100€</p>
                <p>Cash</p>
                {/* Der ....btn = true => kleine pop-up-box mit Edit oder Delete gerendert werden */}
                <div className="option-btn">
                  <button>....</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
