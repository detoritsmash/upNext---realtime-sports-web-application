import {
  House,
  Trophy,
  Search,
  User
} from "lucide-react";

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-neutral-900 text-white border-t border-neutral-800">
      <div className="flex justify-around py-3">
        <House />
        <Trophy />
        <Search />
        <User />
      </div>
    </nav>
  );
};

export default BottomNavigation;