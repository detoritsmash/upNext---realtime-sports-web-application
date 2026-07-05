import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-neutral-900 text-white">
      <h1 className="text-2xl font-bold text-lime-400">
        UpNext
      </h1>

      <div className="flex items-center gap-5">
        <Search size={22} className="cursor-pointer" />
        <Bell size={22} className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Navbar;