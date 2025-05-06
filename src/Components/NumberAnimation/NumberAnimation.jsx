import { motion, MotionConfig } from "motion/react";
import NumberFlow, { useCanAnimate } from "@number-flow/react";
import { ArrowUp } from "lucide-react";
import clsx from "clsx/lite";
const MotionNumberFlow = motion.create(NumberFlow);
const MotionArrowUp = motion.create(ArrowUp);

export function PercentageMotion({ value }) {
  const canAnimate = useCanAnimate();
  return (
    <MotionConfig
      // Disable layout animations if NumberFlow can't animate.
      transition={{
        layout: canAnimate
          ? { duration: 0.9, bounce: 0, type: "spring" }
          : { duration: 0 },
      }}
    >
      <motion.span
        className={clsx(
          value > 0 ? "bg-emerald-400" : "bg-red-500",
          "flex w-fit items-center px-[0.3em] text-xl text-white transition-colors duration-300"
        )}
        layout
        style={{ borderRadius: 999 }}
      >
        <MotionArrowUp
          className="mr-0.5 size-[0.75em]"
          absoluteStrokeWidth
          strokeWidth={3}
          layout
          transition={{
            rotate: canAnimate
              ? { type: "spring", duration: 0.5, bounce: 0 }
              : { duration: 0 },
          }}
          animate={{ rotate: value > 0 ? 0 : -180 }}
          initial={false}
        />
        <MotionNumberFlow
          value={value}
          className="medium"
          format={{
            style: "percent",
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          }}
          style={{
            "--number-flow-char-height": "0.85em",
            "--number-flow-mask-height": "0.3em",
          }}
          layout
          layoutRoot
        />
      </motion.span>
    </MotionConfig>
  );
}
