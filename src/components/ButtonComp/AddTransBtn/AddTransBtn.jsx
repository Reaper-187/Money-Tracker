import { useState } from "react";
import { SelectScreen } from "@c/Overview/SelectScreen/SelectScreen";
import { motion } from "motion/react";
import { Button } from "@c/ui/button";

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
        className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6"
      >
        <Button
          className="min-w-full border shadow-sm bg-background text-foreground font-semibold text-md cursor-pointer hover:bg-muted"
          onClick={() => setToggleSelectScreen(!toggleSelectScreen)}
        >
          + add Transaction
        </Button>
      </motion.div>

      <SelectScreen
        toggleSelectScreen={toggleSelectScreen}
        closeSelectScreen={closeSelectScreen}
      />
    </>
  );
}
