import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 flex items-center bg-white/10 w-screen p-4 z-50 backdrop-blur-lg bg-opacity-60">
      <Link href="/" className="text-2xl font-semibold text-white ml-8 hover:text-gray-400 shadow-text">AniWrapped</Link>
    </nav>
  );
};

export default Navbar;
