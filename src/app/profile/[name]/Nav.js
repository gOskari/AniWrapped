"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Nav = ({ name }) => {
  name = name.toLowerCase();
  const [text, setText] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const push = (view) => {
    router.push(`/profile/${name}/?${view}`, undefined, { shallow: true });
  };

  const changeView = (view) => {
    //const currentCounter = query.counter ? parseInt(query.counter) : 0
    const href = `/profile/${name}/?view=${view}`;
    //setView(view);
    router.push(href, href, { shallow: true });
  }

  const isCurrentView = (currentView) => view === currentView;
    
  console.log('view', view)
  return (
    <>
      <div className={`flex items-center justify-center`}>
        <Link
          href={`/profile/${name}`}
          scroll={false}
          shallow={true}
          className={`text-2xl text-secondary-color hover:text-bg-color rounded-lg p-3 ${!view ? "bg-bg-color" : ""}`}
        >
          Profile
        </Link>
        <Link
          href={`/profile/${name}?view=ranking`}
          scroll={false}
          shallow={true}
          className={`text-2xl text-secondary-color hover:text-bg-color rounded-lg p-3 ${view === "ranking" ? "bg-bg-color" : ""}`}
        >
          Leaderboard
        </Link>
        {/*<Link
          href={`/profile/${name}?view=compare`}
          scroll={false}
          shallow={true}
          className={`text-2xl text-secondary-color hover:text-bg-color rounded-lg p-3 ${view === "compare" ? "bg-bg-color" : ""}`}
        >
          Compare
        </Link> */}
      </div>
    </>
  );
};

export default Nav;
