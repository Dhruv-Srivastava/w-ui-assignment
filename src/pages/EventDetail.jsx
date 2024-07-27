import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getRetreat } from "../api/index";
import Spinner from "../components/primitives/Spinner";
import CalenderIcon from "../assets/calender.svg";
import LocationIcon from "../assets/location-bg.svg";
import TimerIcon from "../assets/timer.svg";
import BackIcon from "../assets/back.svg";
import YogaImage from "../assets/yoga.svg";
import { capitalize } from "../utils/capitalize";
import { getDate } from "../utils/get-date";
import InfoCard from "../components/InfoCard";
import Button from "../components/primitives/Button";
import Badge from "../components/primitives/Badge";
import { motion } from "framer-motion";


export default function EventDetail() {
  const { id } = useParams();
  const {
    data: res,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["retreats", id],
    queryFn: () => getRetreat(id),
    notifyOnChangeProps: "all",
  });

  const data = res?.data;

  if (isLoading) {
    return (
      <section className="min-h-[100dvh] grid place-items-center">
        <Spinner />
      </section>
    );
  }

  if (isError) {
    const message =
      error.response.status == 404
        ? "No such retreat available"
        : "Something went wrong :/";
    console.log(error.response.status);
    return (
      <section className="min-h-[100dvh] flex flex-col justify-center items-center gap-4">
        <img src={YogaImage} alt="" className="h-80" />
        <p>
          {message}.{" "}
          <Link to="/" className="text-green-500">
            Click here to go to home
          </Link>
        </p>
      </section>
    );
  }

  const dateTimeString = getDate(data.date * 1000)
    .split(" ")
    .slice(1)
    .join(" ");
  return (
    <motion.section className="container mx-auto min-h-[100dvh] bg-[#EDE9FF] lg:grid lg:grid-cols-[3fr_2fr] lg:place-items-center lg:gap-10 lg:p-10">
      <motion.div
        className="relative self-stretch"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={data.image}
          alt=""
          className="w-full h-[250px] object-cover object-center backdrop-blur-sm lg:h-full lg:rounded-lg lg:hover:scale-105 lg:transition-[300ms_ease_transform]"
        />
        <div className="flex justify-center items-center gap-4 shadow-lg w-[80%] h-16 p-3 rounded-full bg-white backdrop-blur-lg absolute inset-0 -bottom-60 m-auto z-10 lg:hidden">
          <Badge style={{ background: "#F0635A" }}>{data.tag[0]}</Badge>
          <Badge style={{ background: "#F59762" }}>{data.tag[1]}</Badge>
        </div>
      </motion.div>

      <motion.div className="px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Link to={`..`} className="mb-3 flex gap-2 items-center">
            <img src={BackIcon} alt="" />
            <span>Back</span>
          </Link>
        </motion.div>

        <motion.h1
          className="font-medium text-[2.4rem] leading-tight tracking-tighter mb-5 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        >
          {data.title}
        </motion.h1>
        <InfoCard
          icon={LocationIcon}
          text={capitalize(data.location)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.7 }}
        />
        <InfoCard
          icon={CalenderIcon}
          text={dateTimeString}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.0 }}
        />
        <InfoCard
          icon={TimerIcon}
          text={`${data.duration} days`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.3 }}
        />
        <div className="mt-10">
          <motion.h2
            className="font-medium text-xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 2.7 }}
          >
            About Event
          </motion.h2>
          <motion.p
            className="text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 3.0 }}
          >
            {data.description}
          </motion.p>
        </div>
        <motion.div
          className="flex justify-center mt-10 pb-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 3.3 }}
        >
          <Button
            variant="next"
            style={{ background: "#5669FF", color: "#FFF" }}
          >
            Buy ticket @ &#8377;{data.price}
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
