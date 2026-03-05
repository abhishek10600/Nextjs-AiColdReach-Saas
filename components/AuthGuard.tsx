"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "./ui/spinner";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }
  return <>{children}</>;
};

export default AuthGuard;
