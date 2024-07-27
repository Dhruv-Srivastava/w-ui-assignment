import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import LocationLogo from "../assets/location.svg";
import DateLogo from "../assets/date.svg";
import FallbackImage from "../assets/event-card-fallback.jpg";

import { getDate } from "../utils/get-date";
import { capitalize } from "../utils/capitalize";
import { isValidURL } from "../utils/check-url";

export default function EventCard({ item, variants }) {
  // console.log("Hi I'm re-rendering");
  const navigate = useNavigate();
  const dateTimeString = getDate(item.date * 1000)
    .split(" ")
    .slice(1)
    .join(" ");
  
  const imageSrc = isValidURL(item.image) ? item.image : FallbackImage

  return (
    <motion.div
      className="relative text-white w-full max-w-[400px] shadow-lg rounded-lg flex flex-col gap-3 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/${item.id}`)}
      variants={variants}
      key={item}
    >
      <img
        src={imageSrc}
        alt=""
        className="w-full h-[200px] object-cover object-center rounded-md hover:scale-105 transition-[300ms_ease_transform] lg:h-[300px]"
      />
      <div className="w-[95%] absolute bottom-2 m-0 left-[0.625rem] grid gap-6 grid-cols-[7fr_3fr] py-4 px-3 rounded-lg bg-transparent backdrop-blur-[30px]">
        <div className="text-sm font-normal">
          <p className="font-semibold mb-2">{item.title}</p>
          <div className="mb-2 flex gap-2">
            <img src={LocationLogo} alt="" />
            <p>{capitalize(item.location)}</p>
          </div>
          <div className="flex gap-2">
            <img src={DateLogo} alt="" />
            <p>{dateTimeString}</p>
          </div>
        </div>
        <div className="h-max w-max self-center mx-auto">
          <p className="text-[0.625rem] font-normal">Starts from</p>
          <p className="text-xl font-semibold">&#8377;{item.price}</p>
        </div>
      </div>
    </motion.div>
  );
}
