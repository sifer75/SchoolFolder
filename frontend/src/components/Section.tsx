import { IoIosArrowForward } from "react-icons/io";
import ButtonSwitch from "./ButtonSwitch";
import { useState } from "react";

export interface SectionProps {
  id: string;
  name: string;
  collectionNumber: number;
  children?: SectionProps[];
}

function Section({ id, name, collectionNumber, children }: SectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        id={`Section__container__${id}`}
        className="min-h-20 bg-blue-500 flex items-center justify-between px-6 rounded-xl hover:bg-amber-100"
        onClick={() => {
          window.location.href = `/section/${id}`;
        }}
      >
        <div
          id={`Section__left__container__${id}`}
          className="flex flex-col gap-2"
        >
          <div
            id={`Section__buttonSwitch__container__${id}`}
            className="flex items-center gap-4 whitespace-nowrap"
          >
            {children && children.length > 0 ? (
              <ButtonSwitch
                id={`Section__buttonSwitch__${id}`}
                setOpen={setOpen}
                open={open}
              />
            ) : undefined}
            <div
              id={`Section__description__container__${id}`}
              className="flex flex-col gap-2"
            >
              <p id={`Section__name__${id}`}>{name}</p>
              {collectionNumber > 0 ? (
                <p id={`Section__count__${id}`}>
                  nombre de carte: {collectionNumber}
                </p>
              ) : (
                <p id={`Section__count__${id}`}>aucune carte</p>
              )}
            </div>
          </div>
        </div>
        <IoIosArrowForward />
      </div>
      {open && children && children.length > 0 && (
        <div
          id={`Section__children__container__${id}`}
          className="pl-10 flex flex-col gap-10"
        >
          {children.map((children, index) => (
            <Section
              id={`Section__children__${children.id}`}
              key={`${index}__${children.id}`}
              name={children.name}
              collectionNumber={children.collectionNumber}
              children={children.children}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Section;
