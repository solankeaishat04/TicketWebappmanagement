import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaHome, FaTicketAlt, FaTimes, FaArrowLeft } from "react-icons/fa";

interface SidebarProps {
  showSidebar?: boolean;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  showSidebar = false,
  setShowSidebar,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("user");
    onLogout?.();
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          showSidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setShowSidebar?.(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 w-64 min-h-screen bg-gray-300 px-5 pb-3 flex flex-col justify-between transform transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          {/* Logo */}
          <div className="mb-5 flex items-center space-x-2">
            <img
              src="/images/ticket_management_app_logo_triangular_tickets-removebg-preview.svg"
              alt="TicketWeb logo"
              className="h-16 w-16 md:h-16"
            />
            <span className="text-lg md:text-2xl font-semibold text-black">
              TicketMaster
            </span>
          </div>

          {/* Links */}
          <div className="space-y-5">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 p-3 rounded-xl bg-green-500 hover:bg-green-800 text-white font-semibold shadow gap-4"
              onClick={() => setShowSidebar?.(false)}
            >
              <FaHome size={20} />
              Dashboard
            </Link>
            <Link
              to="/tickets"
              className="flex items-center space-x-3 p-3 rounded-xl bg-green-500 hover:bg-green-800 text-white gap-4 font-semibold shadow"
              onClick={() => setShowSidebar?.(false)}
            >
              <FaTicketAlt size={20} />
              Ticket Management
            </Link>
          </div>
        </div>

        {/* Back to Home + Logout */}
        <div className="mt-auto mb-5 space-y-3">
          {/* ✅ Back to Home Button */}
          <button
            onClick={handleBackHome}
            className="w-full flex items-center justify-start space-x-2 p-3 text-green-700 font-semibold hover:text-green-900 gap-2"
          >
            <FaArrowLeft size={18} /> Back to Home
          </button>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-start space-x-2 p-3 text-red-700 gap-2"
          >
            <FaSignOutAlt size={20} /> Logout
          </button>
        </div>

        {/* Close button for mobile */}
        <button
          className="absolute top-3 right-4 md:hidden p-2 text-black"
          onClick={() => setShowSidebar?.(false)}
        >
          <FaTimes size={20} />
        </button>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
