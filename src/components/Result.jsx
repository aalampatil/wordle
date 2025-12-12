import React, { useContext } from "react";
import { WordContext } from "../context/Context";

function Result() {
  const { word, guesses } = useContext(WordContext);

  const latestGuess = guesses[guesses.length - 1];
  let result;

  if (word === latestGuess) {
    result = "win";
  } else {
    result = "lost";
  }

  return (
    <div className="mx-52 rounded-md absolute inset-0 flex items-center justify-center border-2 border-white bg-black/60 backdrop-blur-md z-[9999] ">
      <div className="bg-black/60 backdrop-blur-sm h-[250px] w-[250px] px-6 py-4 rounded-xl text-white text-2xl flex flex-col items-center justify-center">
        <p>Game Over</p>
        {result === "win" ? (
          <p className="text-green-500">You Win</p>
        ) : (
          <div>
            <p>You Lost</p>
            <p>The word is :{word}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;

// export default Result
