import React, { useContext } from "react";
import { WordContext } from "../context/Word";

function Result({ show }) {
  const { word, guesses } = useContext(WordContext);

  const latestGuess = guesses[guesses.length - 1];
  let result;

  if (word === latestGuess) {
    result = "win";
  } else {
    result = "lost";
  }

  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 200)     
  }

  return (
    <div
      className={`mx-52 rounded-md absolute inset-0 flex flex-col items-center justify-center border-2 ${result === 'win' ? "border-green-500" : "border-yellow-400"} border-white bg-black/60 backdrop-blur-md z-[9999]`}
    >
      <div
        className="bg-transparent backdrop-blur-sm h-[250px] w-[250px] px-6 py-4 rounded-xl text-white text-2xl flex flex-col items-center justify-center gap-4"
      >
        <p>Game Over</p>
        {result === "win" ? (
          <p className="text-green-500">You Win</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm">You Lost</p>
            <p className="text-sm">The word was "{word}"</p>
          </div>
        )}
      </div>

      <div>
        <button className="text-white border-2" onClick={handleClick}>New Game</button>
      </div>
    </div>
  );
}

export default Result;

// this container is relative to Board and is overlay on board
