import React, { useContext, useEffect, useState } from "react";
import { WordContext } from "../../context/Context.jsx";
import Button from "./Button";
import { FaDeleteLeft } from "react-icons/fa6";

function Keyboard() {
  const {
    currentG,
    setCurrentG,
    setGuesses,
    setIsCorrect,
    word,
    setIsPresent,
    setGameOver,
    gameOver,
  } = useContext(WordContext);
  const [disable, setDisable] = useState(false);

  const handleKeyPress = (key) => {
    setCurrentG((prev) => {
      if (prev.length >= 5) return prev;
      return prev + key; //+= can cause bugs
    });
  };

  const remove = () => {
    setCurrentG((prev) => {
      if (!prev) return prev;
      return prev.slice(0, -1); // slice returns new string
    });
  };

  const compare = () => {
    if (currentG.length !== 5) return;
    const results = [];
    const matchResult = [];

    for (let i = 0; i < 5; i++) {
      results.push(word[i].toUpperCase() === currentG[i]);
      const c = currentG[i];
      const exist = word.includes(c);
      matchResult.push(exist && !results[i]);
    }

    setGameOver(currentG === word);
    setIsCorrect((prev) => [...prev, results]);
    setIsPresent((prev) => [...prev, matchResult]);
    setGuesses((prev) => [...prev, currentG]);
    setCurrentG("");
    setDisable(false);
  };

  useEffect(() => {
    //console.log(currentG);

    setDisable(currentG.length === 5);
  }, [currentG]);

  return (
    <div className="flex flex-col gap-[7px] w-full">
      {/* first row */}
      <div className="flex flex-row items-center justify-center gap-[5px] ">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
          (char, index) => {
            return (
              <Button
                key={index}
                char={char}
                handleKeyPress={handleKeyPress}
                disable={disable}
              />
            );
          }
        )}
      </div>

      {/* second row */}
      <div className="flex flex-row items-center justify-center gap-[5px] ">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((char, index) => {
          return (
            <Button
              key={index}
              char={char}
              handleKeyPress={handleKeyPress}
              disable={disable}
            />
          );
        })}
      </div>

      {/* third row */}
      <div className="flex flex-row items-center justify-center gap-[5px] ">
        <button
          onClick={compare}
          value={"ENTER"}
          className={`h-[58px] w-fit p-2 text-center text-xl bg-neutral-500 font-bold text-white rounded-lg  hover:cursor-pointer`}
        >
          ENTER
        </button>
        {["Z", "X", "C", "V", "B", "N", "M"].map((char, index) => {
          return (
            <Button
              key={index}
              char={char}
              handleKeyPress={handleKeyPress}
              disable={disable}
            />
          );
        })}
        <button
          onClick={remove}
          className={`h-[58px] w-14 flex items-center justify-center p-2 text-xl bg-neutral-500 font-bold text-white rounded-lg hover:cursor-pointer`}
        >
          <FaDeleteLeft />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
