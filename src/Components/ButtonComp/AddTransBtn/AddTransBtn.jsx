import { useState } from "react";
import { SelectScreen } from "@c/Overview/SelectScreen/SelectScreen";
import { motion } from "motion/react";

import "./AddTransBtn.css";

export function AddTransBtn() {
  const [toggleSelectScreen, setToggleSelectScreen] = useState(false);

  const closeSelectScreen = () => {
    setToggleSelectScreen(false);
    console.log("Clicked");
  };

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 20,
            x: 10,
          },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.55 }}
        className="add-trans-container"
      >
        <span
          className="add-trans-btn btn-white btn-animate"
          onClick={() => setToggleSelectScreen(!toggleSelectScreen)}
        >
          + Add New
        </span>
      </motion.div>

      <SelectScreen
        toggleSelectScreen={toggleSelectScreen}
        closeSelectScreen={closeSelectScreen}
      />
    </>
  );
}
