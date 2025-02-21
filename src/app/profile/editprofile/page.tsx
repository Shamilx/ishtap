"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import supabase from "@/supabase/client";
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoIosLogIn } from "react-icons/io";

function EditProfile() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  const handleDeleteProfile = async () => {
    const confirmation = confirm("Are you sure to delete your account?");

    if (confirmation) {
      supabase.auth.signOut();
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    if (!user.email) return;

    const newPassword = prompt("Provide the New password.");

    if (!newPassword) return;

    const {  error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) alert(error.message);
    else alert("Updated.");
  };

  return (
    <div className="flex text-white">
      <div className="mt-4 flex w-full flex-col items-center gap-3">
        <button
          onClick={handleChangePassword}
          className="flex w-[200px] justify-center gap-2 rounded-lg bg-primary py-2"
        >
          <CiEdit size={24} color="white" />
          Change Password
        </button>

        <button
          onClick={() => supabase.auth.signOut()}
          className="flex w-[200px] justify-center gap-2 rounded-lg bg-red-500 py-2"
        >
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
