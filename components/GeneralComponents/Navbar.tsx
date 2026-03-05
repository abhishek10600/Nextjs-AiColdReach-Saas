"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutUser } from "@/features/auth/api";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logoutUser();
      dispatch(logout());
      toast.success("Logged Out Successfully");
      router.replace("/login");
    } catch (error) {
      toast.error("Some error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full border-b bg-background px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/dashboard">
        <h1 className="text-lg font-semibold tracking-tight">ColdReachAI</h1>
      </Link>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-muted-foreground">{user.email}</span>

            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </>
        )}
        {!user && <Spinner />}

        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer"
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <LogOut size={16} />
              Logout
            </>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
