"use client";

import { useTheme } from "@/context/ThemeProvider";

// icons
import { IoSunnyOutline } from "react-icons/io5";
import { LuMoonStar } from "react-icons/lu";
function ChangeTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <>
        {theme === "light" && (
          <button onClick={toggleTheme} className="border-[3px] border-white" id="button-change-theme">
            <IoSunnyOutline color="#213555" size={24} />
          </button>
        )}
      </>
      <>
        {theme === "dark" && (
          <button onClick={toggleTheme} className="border-[3px] border-primary"  id="button-change-theme">
            <LuMoonStar color="white" size={24} />
          </button>
        )}
      </>
    </>
  );
}

export default ChangeTheme;
