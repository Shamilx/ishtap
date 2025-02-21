"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import supabase from "@/supabase/client";
import { CiEdit, CiPen, CiTrash } from "react-icons/ci";
import { IoIosLogIn } from "react-icons/io";

function EditProfile() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  const handleDeleteProfile = async () => {
    const confirmation = confirm("Are you sure to delete your account?");

    if (confirmation) {
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    if (!user.email) return;

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      user.email,
      {},
    );
  };

  return (
    <div className="flex dark:text-white">
      <div className="mt-4 flex w-full flex-col items-center gap-3">
        <button
          onClick={handleChangePassword}
          className="flex w-[200px] justify-center gap-2 rounded-lg bg-primary py-2"
        >
          <CiEdit size={24} />
          Change Password
        </button>

        <button className="flex w-[200px] justify-center gap-2 rounded-lg bg-red-500 py-2">
          <IoIosLogIn size={24} color="white" />
          Sign Out
        </button>

        <button
          onClick={handleDeleteProfile}
          className="flex w-[200px] justify-center gap-2 rounded-lg bg-red-700 py-2 font-bold"
        >
          <CiTrash size={24} color="white" />
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
