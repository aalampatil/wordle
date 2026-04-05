import Tile from "./Tile";

function TypingRow({ word, checked=false }) {
  //console.log(word);
  
  return (
    <div className={`flex gap-2 `}>
      {[...Array(5)].map((_, i) => (
        <Tile key={i} char={word[i]} checked={checked} />
      ))}
    </div>
  );
}

export default TypingRow