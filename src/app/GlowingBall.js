"use client"

import { useTheme } from "next-themes";

const GlowingBallsBackground = () => {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "light") {
    return null;
  }

  return (
      <div className="text-white">
        {/* Background container for glowing balls */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple glowing balls */}
          <div className="w-80 h-80 bg-opacity-50 ball filter blur-3xl fixed bottom-96 left-20 bg-red-600"></div>
          <div className="w-80 h-80 bg-opacity-50 ball filter blur-3xl fixed bottom-48 left-40 bg-blue-600"></div>
          <div className="w-80 h-80 bg-opacity-50 ball filter blur-3xl fixed bottom-64 left-60 bg-purple-400"></div>
          {/* Add more balls with different sizes, colors, and positions as needed */}
        </div>
      </div>
    );
  }

export default GlowingBallsBackground;