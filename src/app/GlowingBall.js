const GlowingBallsBackground = () => {
    return (
      <div className="text-white">
        {/* Background container for glowing balls */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple glowing balls */}
          <div className="w-96 h-96 bg-opacity-50 ball filter blur-3xl fixed top-10 left-20"></div>
          <div className="w-80 h-80 bg-opacity-50 ball filter blur-3xl fixed bottom-20 right-20"></div>
          {/* Add more balls with different sizes, colors, and positions as needed */}
        </div>
      </div>
    );
  }

export default GlowingBallsBackground;