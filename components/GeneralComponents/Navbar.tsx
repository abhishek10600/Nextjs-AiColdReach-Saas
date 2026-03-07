"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutUser } from "@/features/auth/api";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  onMenuClick: () => void;
};

const Navbar = ({ onMenuClick }: Props) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      toast.success("Logged out successfully");
      router.replace("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="w-full border-b bg-background px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden">
          <Menu size={22} />
        </button>

        <h1 className="text-lg font-semibold">ColdReachAI</h1>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden md:block text-sm text-muted-foreground">
              {user.email}
            </span>

            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </>
        ) : (
          <Spinner />
        )}

        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut size={16} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
