import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { SearchParamsContext } from "../../context/SearchParams";
import { capitalize } from "../../utils/capitalize";

export default function Dropdown({ data }) {
  const [params] = useContext(SearchParamsContext);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  console.log(params);

  return (
    <div className="flex-1 z-100 lg:max-w-[30%]">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex w-full min-w-30 items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-sm">
            {params.get(data.title.toLowerCase())
              ? capitalize(params.get(data.title.toLowerCase()))
              : `${data.title}`}
          </span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 max-h-48 overflow-y-auto z-40"
        >
          {data.options.map((option, i) => (
            <Option
              query={data.title.toLowerCase()}
              setOpen={setOpen}
              setSelected={setSelected}
              text={option}
              key={i}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

function Option({ query, text, setOpen, setSelected }) {
  const [, setSearchParams] = useContext(SearchParamsContext);
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setSelected(text);
        setSearchParams((prev) => {
          prev.delete("search");
          prev.set("page", 1);
          prev.set("limit", 3);
          prev.set(query, text);
          return prev;
        });
        setOpen(false);
      }}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}></motion.span>
      <span>{text}</span>
    </motion.li>
  );
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.03,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
