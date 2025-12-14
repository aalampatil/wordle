import { createContext, use, useEffect, useState } from "react";
import wordsList from "../assets/assets.js";

export const WordContext = createContext();

export const WordContextProvider = ({ children }) => {
  const [word, setWord] = useState("");
  const [currentG, setCurrentG] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);
  const [isPresent, setIsPresent] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [checked, setChecked] = useState(false)

  const pickword = async () => {
    
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    console.log(wordsList[randomIndex]);
    
    setWord(wordsList[randomIndex]);
  };

  useEffect(() => {
    pickword();
  }, []);
   

  useEffect(()=>{
    if(guesses.length === 0) return;
    const latestGuess = guesses[guesses.length -1];
    
    if (latestGuess === word) {
      setGameOver(true)
      return;
    }

    if (guesses.length === 6 && currentG !== word) {
      setGameOver(true);
    }
    //console.log(gameOver);
    
  },[guesses])

  const value = {
    currentG,
    setCurrentG,
    guesses,
    setGuesses,
    word,
    isCorrect,
    setIsCorrect,
    isPresent,
    setIsPresent,
    gameOver,
    setGameOver,
    checked,
    setChecked
  };

  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};
