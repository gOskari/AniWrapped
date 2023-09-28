import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 flex items-center bg-opacity-30 p-4">
      <Link href="/" className="text-2xl font-semibold text-white-500 ml-8 hover:text-gray-600">AniWrapped</Link>
    </nav>
  );
};

export default Navbar;
