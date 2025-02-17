"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import HeaderMain from "@/layout/HeaderMain";

function Profile() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex min-h-[100vh] flex-col bg-white dark:bg-[#141414]">
      <HeaderMain />

      <div className="px-2 md:px-16 dark:text-white">
        <p>{user?.email}</p>
        <p>{user?.aud}</p>
        <p>{user?.id}</p>
        <p>{user?.role}</p>
      </div>
    </div>
  );
}

export default Profile;
