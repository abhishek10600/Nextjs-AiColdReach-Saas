import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/GeneralComponents/Navbar";
import Sidebar from "@/components/GeneralComponents/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default layout;
