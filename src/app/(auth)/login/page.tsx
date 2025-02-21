"use client";

import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import { jost, koulen } from "@/fonts/fonts";
import supabase from "@/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
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

    if (email === "admin@gmail.com" || password === "admin123") {
      router.push(`/api/login?email=${email}&password=${password}`);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string,
    });

    if (error) {
      setErrorText("Email or Password is wrong.");
    }
  };

  return (
    <div id="login">
      <div id="left" className="flex items-center justify-center text-primary">
        <Logo />
      </div>
      <div id="right">
        <p id="title" style={{ fontFamily: koulen.style.fontFamily }}>
          Sign In
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
            Login
          </button>
          <Link href="/register" id="change" replace>
            Don’t have an account? <span>Sign up.</span>
          </Link>
          <div className="flex items-center justify-center">
            {errorText && errorText === "loading" ? (
              <Loading />
            ) : (
              <p className="text-lg font-bold text-red-700">{errorText}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
