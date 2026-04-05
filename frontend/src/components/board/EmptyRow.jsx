import Tile from "./Tile";

function EmptyRow({}) {
  return (
    <div className={`flex gap-2 `}>
      {[...Array(5)].map((_, i) => (
        <Tile key={i} char={""} />
      ))}
    </div>
  );
}

export default EmptyRow
