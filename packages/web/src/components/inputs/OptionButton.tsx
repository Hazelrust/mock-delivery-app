import { JSX, useState } from "react";

const OptionButton = ({ prop }: { prop: string }): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <button
      className={`px-2 py-1 text-sm rounded-lg border
        ${
          isSelected
            ? "text-white bg-cyan-500 hover:bg-cyan-400"
            : "text-black border-neutral-300 hover:bg-neutral-100"
        }`}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div>{prop}</div>
    </button>
  );
};

export default OptionButton