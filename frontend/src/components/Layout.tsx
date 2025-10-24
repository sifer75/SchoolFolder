import Header from "./Header";
import type { ReactNode } from "react";
import Menu from "./Menu";

interface LayoutProps {
  id: string;
  children: ReactNode;
}
function Layout({ id, children }: LayoutProps) {
  return (
    <div
      id={`Layout__container__${id}`}
      className="bg-gray-100 w-screen h-screen flex flex-col"
    >
      <Header id={`Layout__header__${id}`} />
      <Menu id={`Menu__${id}`} />
      <div
        id={`Layout__body__${id}`}
        className="flex justify-center bg-red-400 w-full flex-1 flex-col items-center"
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
