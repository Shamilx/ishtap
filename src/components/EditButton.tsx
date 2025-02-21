"use client";

import { useAuth } from "@/context/AuthContext";
import { CiEdit } from "react-icons/ci";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

function EditButton(props: { id: number; owner: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <Loading />;

  if (!user) return;

  if (user.id != props.owner) return;

  return (
    <button
      className="flex items-center"
      onClick={() => router.push(`/vacancy/edit/${props.id}`)}
    >
      <CiEdit size={24} className="dark:text-white" />
    </button>
  );
}

export default EditButton;
