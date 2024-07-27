import { motion } from "framer-motion";

export default function InfoCard({ icon, text, ...props }) {
  return (
    <motion.div
      className="flex gap-5 items-center mb-4 bg-slate-50 p-5 rounded-lg"
      {...props}
    >
      <img src={icon} alt="" className="w-8 h-8" />
      <p className="font-normal text-base">{text}</p>
    </motion.div>
  );
}
