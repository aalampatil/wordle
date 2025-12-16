import { motion } from "motion/react";
import { useContext, useState } from "react";
import { WordContext } from "../../context/Context";
import { animate } from "motion";

function Tile({ char, isCorrect, isPresent, checked }) {

  return (
    <motion.div
      animate={checked && {rotate: 360}}
      className={`h-[51px] w-[51px] border-2 border-neutral-700 flex items-center justify-center text-3xl font-bold font-serif text-black dark:text-white  ${
        isCorrect ? "bg-green-500" : isPresent ? "bg-yellow-400" : ""
      } `}
    >
      {char}
    </motion.div>
  );
}

export default Tile;
