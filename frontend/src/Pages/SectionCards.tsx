import { useParams } from "react-router-dom";
import { TbCards } from "react-icons/tb";
import { useTypedQuery } from "@/hooks/useTypedQuery.ts";
import type { CardType } from "@/types/CardType";

interface SectionCardsProps {
  id: string;
}

function SectionCards({ id }: SectionCardsProps) {
  const params = useParams();
  console.log(params.id, "params id");
  const { data: cards } = useTypedQuery<CardType[]>(
    ["cards", params.id!],
    async () => {
      const response = await fetch(
        `http://localhost:3333/folder/${params.id}`,
        {
          credentials: "include",
        },
      );
      return response.json();
    },
  );

  console.log(cards, "coucou");

  return (
    <div
      id={`SectionCards__page__${id}`}
      className="flex justify-center bg-orange-400 w-full h-full flex-1 flex-col items-center"
    >
      {cards && cards.length > 0 ? (
        <div>{cards.map((card) => {
          return (
            <div>{card.name}</div>
          )
        })}</div>
      ) : (
        <div
          id={`SectionCards__container__${id}`}
          className="w-1/4 h-full bg-blue-500 flex flex-col items-center justify-center gap-5"
        >
          <TbCards size={50} />
          <h2 id={`SectionCards__h2__${id}`}>Ce paquet n'a pas de cartes</h2>
          <button
            id={`SectionCards__button__add__${id}`}
            className="p-3 w-full rounded-3xl bg-white text-black hover:bg-gray-200"
            onClick={() =>
              (window.location.href = `/folder/${params.id}/edition`)
            }
          >
            Ajouter des cartes
          </button>
        </div>
      )}
    </div>
  );
}

export default SectionCards;
