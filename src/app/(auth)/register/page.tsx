"use client";

import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import { jost, koulen } from "@/fonts/fonts";
import supabase from "@/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

function Register() {
  const [errorText, setErrorText] = useState<string | undefined | "loading">(
    undefined,
  );

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorText("loading");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) return;

    const { error } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
    });

    if (error) {
      setErrorText(error.message);
    }
  };

  return (
    <div id="register">
      <div id="left" className="flex items-center justify-center text-primary">
        <Logo />
      </div>
      <div id="right" className="relative">
        <button onClick={() => router.replace("/")} className="absolute left-4 top-5">
          <BiChevronLeft size={24} className="text-white" />
        </button>

        <p id="title" style={{ fontFamily: koulen.style.fontFamily }}>
          Sign Up
        </p>

        <form
          style={{ fontFamily: jost.style.fontFamily }}
          onSubmit={handleSubmit}
        >
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            minLength={6}
          />
          <button type="submit" id="done-btn">
            Register
          </button>
          <Link href="/login" id="change" replace>
            Don’t have an account? <span>Sign in.</span>
          </Link>
          <div className="flex items-center justify-center">
            {errorText && errorText === "loading" ? (
              <Loading />
            ) : (
              <p className="text-sm font-bold text-red-700">{errorText}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
