"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if(user) redirect("/");
  
  return <>{children}</>;
}

export default Layout;
