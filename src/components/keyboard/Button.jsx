import { useContext } from "react";
import { WordContext } from "../../context/Word";

function Button({ char, handleKeyPress, disable }) {
  const { isCorrect, isPresent } = useContext(WordContext);

  return (
    <button
      onClick={() => handleKeyPress(char)}
      disabled={disable}
      className={`
        flex items-center justify-center h-10 w-8 text-sm sm:h-12 sm:w-10 sm:text-base md:h-[58px] md:w-[44px] md:text-xl font-bold text-white rounded-md bg-neutral-500 hover:cursor-pointer
        ${isCorrect ? "bg-green-500" : isPresent ? "bg-yellow-400" : ""}
      `}
    >
      {char}
    </button>
  );
}

export default Button;
