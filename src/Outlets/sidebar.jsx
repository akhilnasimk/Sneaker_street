import React from "react";
import Sidebar from "../modules/Admin/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function SideBarOutlet() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Component - handles its own responsive behavior */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:ml-64 pt-16 lg:pt-0 pb-16 md:pb-0">
        {/* pt-16 gives space for mobile top nav, pb-16 for mobile bottom nav */}
        {/* lg:ml-64 provides left margin for desktop sidebar */}
        {/* lg:pt-0 removes top padding on desktop since no top nav */}
        {/* md:pb-0 removes bottom padding on tablets and up */}
        <Outlet />
      </div>
    </div>
  );
}