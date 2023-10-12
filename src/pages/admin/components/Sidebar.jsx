import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`${
        isOpen ? "max-w-[50px]" : "max-w-[280px]"
      } flex-1 h-screen duration-300 bg-gray-500 relative`}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-white border rounded-full absolute -right-2.5 border-primary"
      >
        <ChevronLeftIcon />
      </button>
    </aside>
  );
};

export default Sidebar;
