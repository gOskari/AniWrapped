import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [slider, setSlider] = useState(theme === "light" ? false : true);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setSlider(!slider);
  };

  return (
    <>
      <div className="toggle-switch mt-4">
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={slider}
            class="sr-only peer"
            onChange={handleChange}
          />
          <div class="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </>
  );
};

export default ThemeSwitch;
