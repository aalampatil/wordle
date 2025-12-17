import { motion } from "motion/react";

function Tile({ char, isCorrect, isPresent, checked }) {

  return (
    <motion.div
      animate={checked && {rotate: 360}}
      className={`h-[31px] w-[31px] sm:text-sm md:h-[51px] md:w-[51px] border-2 border-neutral-700 flex items-center justify-center md:text-3xl md:font-extrabold text-black dark:text-white  ${
        isCorrect ? "bg-green-500" : isPresent ? "bg-yellow-400" : ""
      } `}
    >
      {char}
    </motion.div>
  );
}

export default Tile;
