import { easeInOut, motion } from "framer-motion";
import { useState } from "react";
import { PiCaretLeftBold } from "react-icons/pi";
import { PiCaretRightBold } from "react-icons/pi";

export default function AnimatedButton({
  variant,
  onClick = () => {},
  children,
  ...props
}) {
  const [hover, setHover] = useState(false);
  const Caret = variant === "previous" ? PiCaretLeftBold : PiCaretRightBold;
  const transformSign = variant === "previous" ? -1 : 1;

  return (
    <motion.button
      className="flex items-center justify-center py-4 px-8 rounded-xl border w-max border-gray-400 hover:scale-110 transition-transform active:scale-100"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      {...props}
    >
      {variant === "next" && children}
      <div className="flex relative mr-2">
        <div>
          <Caret />
        </div>
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{
            opacity: hover ? 1 : 0,
            x: hover ? 10 * transformSign : 0,
          }}
          transition={{ duration: 0.3, ease: easeInOut }}
        >
          <Caret />
        </motion.div>
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{
            opacity: hover ? 1 : 0,
            x: hover ? 20 * transformSign : 0,
          }}
          transition={{ duration: 0.3, ease: easeInOut }}
        >
          <Caret />
        </motion.div>
      </div>
      {variant === "previous" && children}
    </motion.button>
  );
}
