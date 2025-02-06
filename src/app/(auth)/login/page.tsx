"use client";

import supabase from "@/supabase/supabase";
import React from "react";

function Login() {
  return (
    <button
      onClick={async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: "shamil@gmail.com",
          password: "123456",
        });

        console.log(data);
        console.log(error);
      }}
    >
      Login
    </button>
  );
}

export default Login;
