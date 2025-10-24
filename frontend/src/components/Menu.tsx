import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";

interface MenuProps {
  id: string;
}

function Menu({ id }: MenuProps) {
  const location = useLocation();
  const params = location.pathname.split("/").filter((p) => p);

  function upperCase(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div
      id={`Layout__menu__${id}`}
      className="min-h-20 h-20 bg-gray-300 px-20 flex items-center justify-between w-full"
    >
      <div className="flex items-center gap-2">
        <button
          className="bg-gray-500 rounded-3xl p-2.5 hover:bg-gray-400"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft size={20} color={"white"} />
        </button>
        <p>
          {params.length > 0 ? (
            params.map((param, index) => (
              <React.Fragment key={index}>
                {index > 0 && " / "}
                {upperCase(param)}
              </React.Fragment>
            ))
          ) : (
            <span>Accueil</span>
          )}
        </p>
      </div>
      <p>créer</p>
    </div>
  );
}

export default Menu;
