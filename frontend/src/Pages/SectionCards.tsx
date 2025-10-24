import { useParams } from "react-router-dom";
import { TbCards } from "react-icons/tb";

interface SectionCardsProps {
  id: string;
}

function SectionCards({ id }: SectionCardsProps) {
  const params = useParams();

  return (
    <div
      id={`SectionCards__page__${id}`}
      className="flex justify-center bg-orange-400 w-full h-full flex-1 flex-col items-center"
    >
      <div
        id={`SectionCards__container__${id}`}
        className="w-1/4 h-full flex flex-col items-center justify-center gap-5"
      >
        <TbCards size={50} />
        <h2 id={`SectionCards__h2__${id}`}>Ce paquet n'a pas de cartes</h2>
        <button
          id={`SectionCards__button__add__${id}`}
          className="p-3 w-full rounded-3xl bg-white text-black hover:bg-gray-200"
          onClick={() =>
            (window.location.href = `/section/${params.id}/edition`)
          }
        >
          Ajouter des cartes
        </button>
      </div>
    </div>
  );
}

export default SectionCards;
