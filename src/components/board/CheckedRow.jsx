import { useContext } from "react";
import Tile from "./Tile";
import { WordContext } from "../../context/Word";

function CheckedRow({ word, isCorrect, isPresent }) {
  const {checked} = useContext(WordContext)

  return (
    <div className="flex gap-2">
      {[...Array(5)].map((_, i) => (
        <Tile
          key={i}
          char={word[i] || ""}
          isCorrect={isCorrect[i]}
          isPresent={isPresent[i]}
          checked={checked}
        />
      ))}
    </div>
  );
}

export default CheckedRow;
