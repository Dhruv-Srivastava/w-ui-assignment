import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import { getAllRetreats } from "../api/index";

import EventCard from "../components/EventCard";
import Spinner from "./primitives/Spinner";
import MeditationImage from "../assets/meditation.svg";

export default function EventContainer({ options }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  const optionsToSearch = {};
  for (const key in options) {
    if (options[key] !== "") {
      optionsToSearch[key] = options[key];
    }
  }
  const searchValues = Object.values(optionsToSearch);
  const {
    data: res,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["retreats", ...searchValues],
    queryFn: () => getAllRetreats(optionsToSearch),
    notifyOnChangeProps: "all",
  });

  const data = res?.data;
  // Handle Loading State
  if (isLoading) {
    return (
      <section className="min-h-[624px] grid place-items-center lg:min-h-[300px] lg:my-16">
        <Spinner />
      </section>
    );
  }
  // Handle Error State or Empty Response State
  if (isError || data?.length === 0) {
    return (
      <section className="min-h-[624px] flex flex-col items-center justify-center gap-10 lg:min-h-[300px] lg:gap-3 lg:my-5 lg:justify-start">
        <img
          src={MeditationImage}
          alt=""
          className="h-[400px]  lg:h-[270px] "
        />
        <p>You{`'`}re all caught up.</p>
      </section>
    );
  }
  // Display a list of event cards
  return (
    <AnimatePresence mode="wait">
      <motion.section
        className="container min-h-[624px] w-full px-5 flex flex-col items-center gap-3 lg:flex-row lg:min-h-[300px] lg:justify-center lg:gap-10 lg:my-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={data?.map((item) => item.id).join()}
      >
        {data?.map((retreat) => (
          <EventCard key={retreat.id} item={retreat} variants={childVariants} />
        ))}
      </motion.section>
    </AnimatePresence>
  );
}
