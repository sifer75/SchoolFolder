import Section, { type SectionProps } from "../components/Section";

interface HomepageProps {
  id: string;
}

const sections: SectionProps[] = [
  {
    id: "section1",
    name: "Section 1",
    collectionNumber: 20,
    children: [
      {
        id: "1.1",
        name: "Section 1.1",
        collectionNumber: 3,
        children: [
          {
            id: "1.1.1",
            name: "Section 1.1.1",
            collectionNumber: 4,
            children: [
              {
                id: "1.1.1.1",
                name: "Section 1.1.1.1",
                collectionNumber: 4,
              },
              { id: "1.1.1.2", name: "Section 1.1.1.2", collectionNumber: 7 },
              { id: "1.1.1.3", name: "Section 1.1.1.3", collectionNumber: 15 },
            ],
          },
          { id: "1.1.2", name: "Section 1.1.2", collectionNumber: 0 },
          { id: "1.1.3", name: "Section 1.1.3", collectionNumber: 0 },
        ],
      },
      { id: "1.2", name: "Section 1.2", collectionNumber: 7 },
      { id: "1.3", name: "Section 1.3", collectionNumber: 15 },
    ],
  },
  {
    id: "section2",
    name: "Section 2",
    collectionNumber: 0,
  },
  {
    id: "section3",
    name: "Section 3",
    collectionNumber: 0,
  },
  {
    id: "section4",
    name: "Section 4",
    collectionNumber: 0,
  },
];

function Homepage({ id }: HomepageProps) {
  return (
    <div
      id={`Homepage__container__${id}`}
      className="bg-amber-400 w-3/4 h-[75vh] p-10"
    >
      <div
        id={`Homepage__section__overflowScroll__${id}`}
        className="w-full h-full bg-purple-200 overflow-scroll"
      >
        <div
          id={`Homepage__section__container__${id}`}
          className="flex flex-col gap-10"
        >
          {sections.map((section) => (
            <Section
              id={`Homepage__section__${section.id}`}
              key={section.id}
              name={section.name}
              collectionNumber={section.collectionNumber}
              children={section.children}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
