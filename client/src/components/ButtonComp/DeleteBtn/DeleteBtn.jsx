import React from "react";
import "./DeleteBtn.css";

export function DeleteBtn({ onDelete }) {
  return (
    <button className="delete-btn" onClick={onDelete}>
      <span className="delete-text">Delete</span>
      <span className="delete-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="..." />
        </svg>
      </span>
    </button>
  );
}
