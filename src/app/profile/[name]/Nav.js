import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Nav = ({ name }) => {
  name = name.toLowerCase();
  const [text, setText] = useState(false);
  const router = useRouter();

  /*
  useEffect(() => {
    // Always do navigations after the first render
    router.push(`/profile/${name}/?anime`, undefined, { shallow: true });
  }, []);
  */

  const push = (view) => {
    router.push(`/profile/${name}/?${view}`, undefined, { shallow: true });
  };

  const changeView = (view) => {
    //const currentCounter = query.counter ? parseInt(query.counter) : 0
    const href = `/profile/${name}/?view=${view}`;
    //setView(view);
    router.push(href, href, { shallow: true });
  };

  return (
    <>
      <div className="flex items-center justify-center gap-32 p-5 bg-black">
        <Link
          href={`/profile/${name}`}
          scroll={false}
          shallow={true}
          className="text-2xl text-secondary-color hover:text-bg-color"
        >
          Profile
        </Link>
        <Link
          href={`/profile/${name}?view=ranking`}
          scroll={false}
          shallow={true}
          className="text-2xl text-secondary-color hover:text-bg-color"
        >
          Leaderboard
        </Link>
        <Link
          href={`/profile/${name}?view=compare`}
          scroll={false}
          shallow={true}
          className="text-2xl text-secondary-color hover:text-bg-color"
        >
          Compare
        </Link>
      </div>
    </>
  );
};

export default Nav;
