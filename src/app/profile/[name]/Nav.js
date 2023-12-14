"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Nav = ({ name }) => {
  name = name.toLowerCase();
  const router = useRouter();

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  return (
    <>
      <div className={`flex items-center justify-center`}>
        <Link
          href={`/profile/${name}`}
          scroll={false}
          shallow={true}
          className={`rounded-lg p-3 text-2xl text-secondary-color hover:text-secondary-color-dark  ${
            !view ? "bg-bg-color" : ""
          }`}
        >
          Profile
        </Link>
        <Link
          href={`/profile/${name}?view=ranking`}
          scroll={false}
          shallow={true}
          className={`rounded-lg p-3 text-2xl text-secondary-color hover:text-secondary-color-dark ${
            view === "ranking" ? "bg-bg-color" : ""
          }`}
        >
          Leaderboard
        </Link>
        <Link
          href={`/profile/${name}?view=compare`}
          scroll={false}
          shallow={true}
          className={`text-2xl text-secondary-color hover:text-secondary-color-dark rounded-lg p-3 ${view === "compare" ? "bg-bg-color" : ""}`}
        >
          Compare
        </Link>
      </div>
    </>
  );
};

export default Nav;
