import { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

import Dropdown from "./Dropdown";
import FilterIcon from "../../assets/filter.svg";
import { locations, type } from "../../data";

export default function Drawer() {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid place-content-center">
      <button
        onClick={() => setOpen(true)}
        className="flex gap-2 bg-[#5D56F3] rounded-3xl p-2 pr-3 text-white cursor-pointer"
      >
        <img src={FilterIcon} alt="" className="" />
        <span className="font-light text-sm">Filters</span>
      </button>

      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="mx-auto flex items-center justify-center flex-wrap gap-4 max-w-2xl text-neutral-400">
          <Dropdown data={{ title: "Location", options: locations }} />
          <Dropdown data={{ title: "Type", options: type }} />
        </div>
      </DragCloseDrawer>
    </div>
  );
}

function DragCloseDrawer({ open, setOpen, children }) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height, width }] = useMeasure();

  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async (direction) => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    if (direction === "bottom") {
      const yStart = typeof y.get() === "number" ? y.get() : 0;
      await animate("#drawer", {
        y: [yStart, height],
      });
    } else if (direction === "right") {
      const xStart = typeof x.get() === "number" ? x.get() : 0;
      await animate("#drawer", {
        x: [xStart, width],
      });
    }

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() =>
            handleClose(window.innerWidth >= 1024 ? "right" : "bottom")
          }
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{
              y: window.innerWidth >= 1024 ? "0%" : "100%",
              x: window.innerWidth >= 1024 ? "100%" : "0%",
            }}
            animate={{
              y: window.innerWidth >= 1024 ? "0%" : "0%",
              x: window.innerWidth >= 1024 ? "0%" : "0%",
            }}
            transition={{
              ease: "easeInOut",
            }}
            className={`absolute ${
              window.innerWidth >= 1024
                ? "right-0 h-full w-[40dvw] rounded-l-3xl"
                : "bottom-0 h-[50dvh] w-full rounded-t-3xl"
            } overflow-hidden bg-neutral-900`}
            style={{ y, x }}
            drag={window.innerWidth >= 1024 ? "x" : "y"}
            dragControls={controls}
            onDragEnd={() => {
              if (window.innerWidth >= 1024 ? x.get() >= 100 : y.get() >= 100) {
                handleClose(window.innerWidth >= 1024 ? "right" : "bottom");
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
              right: 0.5,
              left: 0,
            }}
          >
            <div
              className={`absolute ${
                window.innerWidth >= 1024
                  ? "left-0 top-0 bottom-0 flex justify-center items-center"
                  : "left-0 right-0 top-0 flex justify-center"
              } bg-neutral-900 p-4 z-50`}
            >
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className={`cursor-grab touch-none bg-neutral-700 active:cursor-grabbing ${
                  window.innerWidth >= 1024
                    ? "w-2 h-14 rounded-full"
                    : "h-2 w-14 rounded-full"
                }`}
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
