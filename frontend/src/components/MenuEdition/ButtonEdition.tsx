import type { Editor } from "@tiptap/react";
import { useState, type ReactNode, useRef } from "react";
import PopUp from "./PopUp";

interface ButtonEditionProps {
  id: string;
  typography: string;
  editor: Editor | null;
  action: (editor: Editor) => void;
  isActive: boolean;
  icon: ReactNode;
}

function ButtonEdition({
  id,
  typography,
  editor,
  action,
  isActive,
  icon,
}: ButtonEditionProps) {
  const [hover, setHover] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - rect.height,
        left: rect.left + rect.width / 2,
      });
    }
    setHover(true);
  };

  return (
    <div className="relative">
      <button
        id={`ButtonEdition__${id}`}
        ref={buttonRef}
        className={`p-2 rounded flex-nowrap flex items-center gap-2 w-10 h-10 ${
          isActive ? "bg-blue-500 text-white" : "bg-gray-200"
        } hover:bg-gray-200 hover:text-black`}
        onClick={() => editor && action(editor)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHover(false)}
      >
        {icon}
      </button>
      {hover && (
        <PopUp
          id={`PopUp__${id}`}
          text={typography}
          hover={hover}
          top={position.top}
          left={position.left}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setHover(false)}
        />
      )}
    </div>
  );
}

export default ButtonEdition;
