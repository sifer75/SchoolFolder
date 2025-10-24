interface HeaderProps {
  id: string;
}

function Header({ id }: HeaderProps) {
  return (
    <div id={`Header__${id}`} className="min-h-30 w-full bg-gray-200">
      Header
    </div>
  );
}

export default Header;
