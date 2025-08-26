import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation
import logo from "../../../assets/slogo.png";

export default function Sidebar() {
  let navig = useNavigate();
  let location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function logout() {
    console.log("working");
    localStorage.setItem(
      "Localuser",
      JSON.stringify({ islogedin: false, userId: "", isAdmin: "" })
    );
    navig("/Userlogin");
  }

  const navItems = [
    {
      id: "Dash",
      label: "Dashboard",
      route: "/AdminDash",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
    },
    {
      id: "User",
      label: "Manage User",
      route: "/MangeUser",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
    },
    {
      id: "Add",
      label: "Add Product",
      route: "/AddProduct",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      ),
    },
    {
      id: "Products",
      label: "Products",
      route: "/AllProducts",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      ),
    },
    {
      id: "Orders",
      label: "Orders",
      route: "/AllOrders",
      icon: (
        <>
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16 5 16H17M17 13V16"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="9"
            cy="20"
            r="1"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
          />
          <circle
            cx="20"
            cy="20"
            r="1"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
          />
        </>
      ),
    },
  ];
  

  const handleNavigation = (item) => {
    navig(item.route);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-30 shadow-2xl flex-col">
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3 justify-center">
            <img src={logo} className="w-35 h-25 text-purple-400" alt="logo" />
          </div>
          <div className="text-xs text-gray-400 mt-2 flex justify-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Sneaker Street{" "}
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-2 flex justify-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Admin Dash{" "}
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-3 mt-4 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.route; // ✅ Active check via path

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
                    : "bg-gray-800/50 hover:bg-gray-700/70"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.icon}
                </svg>
                <span
                  className={`font-medium ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 bg-gray-800/50 hover:bg-red-900/40 mt-8"
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium text-gray-300">Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile Top Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white z-50 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Sneaker Street
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-700/50 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.route; // ✅ active state
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-md"
                        : "hover:bg-gray-700/70"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                    <span
                      className={`font-medium ${
                        isActive ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-900/40 mt-4 border-t border-gray-700 pt-4"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium text-gray-300">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.route; // ✅ active state
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <svg
                  className={`w-5 h-5 mb-1 ${
                    isActive ? "text-purple-600" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
