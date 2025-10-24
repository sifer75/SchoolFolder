import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";

interface ButtonSwitchProps {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function ButtonSwitch({ id, open, setOpen }: ButtonSwitchProps) {
  return (
    <button
      id={`ButtonSwitch__${id}`}
      className="z-10"
      onClick={(e) => {
        setOpen(!open);
        e.stopPropagation();
      }}
    >
      {open ? <FaCircleMinus size={20} /> : <FaCirclePlus size={20} />}
    </button>
  );
}

export default ButtonSwitch;
