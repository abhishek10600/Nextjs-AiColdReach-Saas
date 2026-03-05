"use client";

import Link from "next/link";
import { Home, User, Settings, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const menu = [
    {
      title: "Home",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Profile",
      icon: User,
      href: "/dashboard/profile",
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: "/dashboard/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside className="h-[calc(100vh-60px)] w-64 border-r bg-background p-4">
      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.title} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 cursor-pointer"
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
