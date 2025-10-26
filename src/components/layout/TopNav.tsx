import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "../Sidebar";

export const TopNav: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* TopNav always sticky at top on mobile */}
      <nav className="w-full bg-white md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 shadow">
        

        <button
          onClick={() => setShowSidebar(true)}
          className="text-black p-2 rounded"
        >
          <FaBars size={20} />
        </button>
      </nav>

      {/* Sidebar overlay */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </>
  );
};
