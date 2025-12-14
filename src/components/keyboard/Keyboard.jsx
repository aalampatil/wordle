import React, { useContext, useEffect, useState, useRef } from "react";
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
    gameOver,
    setChecked,
  } = useContext(WordContext);

  const currentGRef = useRef("");
  //using reference of currentG because useEffect re render page, which can result in stale state(old state)
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
    // console.log("comparing");
    // console.log({currentG}, currentG.length);
    
    if (currentG.length !== 5) return;
    const results = [];
    const matchResult = [];
  
    
    for (let i = 0; i < 5; i++) {
      results.push(word[i].toUpperCase() === currentG[i]);
      const c = currentG[i];
      const exist = word.includes(c);
      matchResult.push(exist && !results[i]);
    }
    
  
    setIsCorrect((prev) => [...prev, results]);
    setIsPresent((prev) => [...prev, matchResult]);
    setGuesses((prev) => [...prev, currentG]);
    setCurrentG("");
    setDisable(false);
    setChecked(true);
  };

  useEffect(() => {
   

    const handler = (event) => {
      console.log(event.key);
      if(event.key === "Backspace"){
         remove();
         return;
      }
      
      //do not directly use state to compare anything and as condition to run something,
      //because it might be behind the actual state, better use useRef
      if(event.key === "Enter" && currentGRef.current.length === 5){
        console.log({currentGRef});
        
         return compare();
      }

      if (!/^[a-z]$/i.test(event.key)) return;
      const keyDown = event.key.toUpperCase();
      setCurrentG((prev) => {
        if (prev.length >= 5) return prev;
        return prev + keyDown; //+= can cause bugs
      });
    };

    window.addEventListener("keydown", handler);

    return ()=> {
      //after adding event listener, you must remove event listener,even if it works
      //because it can cause memory leaks
      window.removeEventListener("keydown", handler)
    }
  }, [currentG]);

  useEffect(() => {
    //console.log(currentG);
    setDisable(currentG.length === 5);
    currentGRef.current = currentG;
  }, [currentG]);

  return gameOver ? (
    ""
  ) : (
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
