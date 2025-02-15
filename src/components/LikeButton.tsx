"use client";

import { useAuth } from "@/context/AuthContext";
import supabase from "@/supabase/client";
import { useEffect, useState } from "react";
import Loading from "./Loading";

import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";

type Props = {
  vacancyId: number;
};

function LikeButton(props: Props) {
  const router = useRouter();
  const { user, loading } = useAuth();
  if (loading) return;

  if (!user) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push("/login");
        }}
      >
        <FiHeart size={24} color="#C90000" />
      </button>
    );
  }

  const [liked, setLiked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchLiked = async () => {
      const { data } = await supabase
        .from("liked")
        .select("*")
        .eq("vacancy", props.vacancyId);

      if (data?.length === 0) {
        setLiked(false);
      } else {
        setLiked(true);
      }
    };

    fetchLiked();
  }, []);

  const like = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (liked) return;

    const { error } = await supabase.from("liked").insert({
      user: user.id,
      vacancy: props.vacancyId,
    });

    if (!error) setLiked(true);
  };

  const unlike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!liked) return;

    const { error } = await supabase
      .from("liked")
      .delete()
      .eq("user", user.id)
      .eq("vacancy", props.vacancyId);

    if (!error) setLiked(false);
  };

  if (liked === undefined) return <Loading />;

  return (
    <>
      <button
        onClick={liked ? unlike : like}
        className="transition-all duration-200"
      >
        <FiHeart
          size={24}
          className={`transition-all duration-200 ${
            liked
              ? "fill-[#C90000] stroke-[#C90000]"
              : "fill-none stroke-[#C90000]"
          }`}
        />
      </button>
    </>
  );
}

export default LikeButton;
