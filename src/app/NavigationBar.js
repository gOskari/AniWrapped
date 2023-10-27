import Link from 'next/link';
import { FiHome } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="flex flex-col items-center bg-primary-color h-screen w-20 pt-10">
      <Link href="/" className="text-2xl text-secondary-color hover:text-bg-color"><FiHome /></Link>
    </nav>
  );
};

export default Navbar;
