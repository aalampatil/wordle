import { createContext, useEffect, useState } from "react";
import wordsList from "../assets/assets.js";

export const WordContext = createContext();

export const WordContextProvider = ({ children }) => {
  const [word, setWord] = useState("");
  const [currentG, setCurrentG] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);
  const [isPresent, setIsPresent] = useState([]);
  const [gameOver, setGameOver] = useState(false)

  const pickword = async () => {
    
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    //console.log(wordsList[randomIndex]);
    
    setWord(wordsList[randomIndex]);
  };

  useEffect(() => {
    pickword();
  }, []);

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
    setGameOver
  };

  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};
