"use client";

import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/GeneralComponents/Navbar";
import Sidebar from "@/components/GeneralComponents/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex flex-col h-screen">
        <Navbar onMenuClick={() => setOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile sidebar */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <SheetHeader className="sr-only">
                <SheetTitle>Sidebar Menu</SheetTitle>
              </SheetHeader>

              <Sidebar />
            </SheetContent>
          </Sheet>

          <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
