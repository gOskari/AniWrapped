const GlowingBallsBackground = () => {
    return (
      <div className="text-white">
        {/* Background container for glowing balls */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple glowing balls */}
          <div className="w-96 h-96 rounded-full bg-purple-600 bg-opacity-50 filter blur-xl shadow-neon fixed top-10 left-10"></div>
          <div className="w-32 h-32 rounded-full bg-blue-600 bg-opacity-50 filter blur-xl shadow-neon fixed top-20 right-20"></div>
          {/* Add more balls with different sizes, colors, and positions as needed */}
        </div>
      </div>
    );
  }

export default GlowingBallsBackground;