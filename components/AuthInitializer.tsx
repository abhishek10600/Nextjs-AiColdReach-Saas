"use client";

import { getCurrentUser } from "@/features/auth/api";
import { setAuthLoad, setUser } from "@/store/slices/authSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setUser(response.data));
      } catch (error) {
        console.log("No user logged in");
      } finally {
        dispatch(setAuthLoad());
      }
    };
    fetchUser();
  }, [dispatch]);

  return <div>{children}</div>;
};

export default AuthInitializer;
