import { IoIosArrowForward } from "react-icons/io";
import ButtonSwitch from "./ButtonSwitch";
import { useState } from "react";
import type { FolderType } from "@/types/FolderType";

export interface FolderProps {
  id: string;
  name: string;
  collectionNumber?: number;
  children?: FolderType[];
}

function Folder({ id, name, folders, collectionNumber }: FolderType) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        id={`Folder__container__${id}`}
        className="min-h-20 bg-blue-500 flex items-center justify-between px-6 rounded-xl hover:bg-amber-100"
        onClick={() => {
          window.location.href = `/folder/${id}`;
        }}
      >
        <div
          id={`Folder__left__container__${id}`}
          className="flex flex-col gap-2"
        >
          <div
            id={`Folder__buttonSwitch__container__${id}`}
            className="flex items-center gap-4 whitespace-nowrap"
          >
            {folders && folders.length > 0 ? (
              <ButtonSwitch
                id={`Folder__buttonSwitch__${id}`}
                setOpen={setOpen}
                open={open}
              />
            ) : undefined}
            <div
              id={`Folder__description__container__${id}`}
              className="flex flex-col gap-2"
            >
              <p id={`Folder__name__${id}`}>{name}</p>
              {collectionNumber && collectionNumber > 0 ? (
                <p id={`Folder__count__${id}`}>
                  nombre de carte: {collectionNumber}
                </p>
              ) : (
                <p id={`Folder__count__${id}`}>aucune carte</p>
              )}
            </div>
          </div>
        </div>
        <IoIosArrowForward />
      </div>
      {open && folders && folders.length > 0 && (
        <div
          id={`Folder__folders__container__${id}`}
          className="pl-10 flex flex-col gap-10"
        >
          {folders.map((folder, index) => (
            <Folder
              id={folder.id}
              key={`${index}__${folder.id}`}
              name={folder.name}
              folders={folder.folders}
              cards={folder.cards}
              // collectionNumber={folders.collectionNumber}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Folder;
