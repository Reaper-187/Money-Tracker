import React from "react";
import "./spinner.css";

export const Spinner = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};
