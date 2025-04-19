import { useState } from "react";
import { SelectScreen } from "@c/Overview/SelectScreen/SelectScreen";
import "./AddTransBtn.css";

export function AddTransBtn() {
  const [toggleSelectScreen, setToggleSelectScreen] = useState(false);

  const closeSelectScreen = () => {
    setToggleSelectScreen(false);
    console.log("Clicked");
  };

  return (
    <>
      <div className="add-trans-container">
        <span
          className="add-trans-btn btn-white btn-animate"
          onClick={() => setToggleSelectScreen(!toggleSelectScreen)}
        >
          + Add New
        </span>
      </div>

      <SelectScreen
        toggleSelectScreen={toggleSelectScreen}
        closeSelectScreen={closeSelectScreen}
      />
    </>
  );
}
