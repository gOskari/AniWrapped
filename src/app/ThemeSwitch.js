import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeSwitch = ({size}) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChange = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center mt-4">
      <button onClick={handleChange} className="focus:outline-none">
        {resolvedTheme === "light" ? (
          <BsFillMoonFill size={size} />
        ) : (
          <BsSunFill size={size} />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitch;
