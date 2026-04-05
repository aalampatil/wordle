import React, { useContext } from "react";
import Board from "../components/board/Board";
import Result from "../components/Result";
import { WordContext } from "../context/Word";

function HomePage() {
  const { gameOver } = useContext(WordContext);
  return (
    <div className="bg-white dark:bg-neutral-900 w-[100%] min-h-screen">
      <div className="flex flex-col gap-0 relative">
        <Board />
        {gameOver && <Result show={gameOver} />}
      </div>
    </div>
  );
}

export default HomePage;
