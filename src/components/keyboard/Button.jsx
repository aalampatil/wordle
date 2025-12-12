import React, { useContext } from "react";
import { WordContext } from "../../context/Context";

function Button({char, handleKeyPress, disable}) {
  const {isCorrect, isPresent} = useContext(WordContext)
  return (
    <button
      onClick={() => handleKeyPress(char)}
      className={`h-[58px] w-[44px] p-2 text-center text-xl font-bold text-white rounded-md bg-neutral-500 hover:cursor-pointer ${
        isCorrect ? "bg-green-500" : isPresent ? "bg-yellow-400" : ""
      } `}
      disabled={disable}
    >{char}</button>
  );
}

export default Button;
