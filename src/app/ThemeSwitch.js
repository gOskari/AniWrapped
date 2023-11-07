import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center mt-4">
      <button onClick={handleChange} className="focus:outline-none">
        {theme === "light" ? (
          <BsFillMoonFill size={24}/>
        ) : (
          <BsSunFill size={24}/>
        )}
      </button>
    </div>
  );
};

export default ThemeSwitch;
