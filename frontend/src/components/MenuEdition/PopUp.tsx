import { createPortal } from "react-dom";

interface PopUpProps {
  id: string;
  text: string;
  hover: boolean;
  top: number;
  left: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function PopUp({ id, text, hover, top, left, onMouseEnter, onMouseLeave }: PopUpProps) {
  const popupRoot = document.getElementById("popup-root");

  if (!popupRoot) {
    return null;
  }

  return createPortal(
    <div
      id={`PopUp__${id}`}
      className={`absolute p-2 border-2 rounded-2xl bg-gray-200 ${
        hover ? "block" : "hidden"
      }`}
      style={{ top: `${top}px`, left: `${left}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {text}
    </div>,
    popupRoot
  );
}

export default PopUp;