"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const menu = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Generate DM",
    icon: MessageCircle,
    href: "/dashboard/generate",
  },
  {
    title: "History",
    icon: History,
    href: "/dashboard/history",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-background p-4 h-full">
      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.title} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                <Icon size={18} />
                {item.title}
              </Button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
