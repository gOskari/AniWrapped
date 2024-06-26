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
            !view ? "bg-primary-color" : ""
          }`}
        >
          Profile
        </Link>
        <Link
          href={`/profile/${name}?view=ranking&filter=following`}
          scroll={false}
          shallow={true}
          className={`rounded-lg p-3 text-2xl text-secondary-color hover:text-secondary-color-dark ${
            view === "ranking" ? "bg-primary-color" : ""
          }`}
        >
          Leaderboard
        </Link>
        <Link
          href={`/profile/${name}?view=compare`}
          scroll={false}
          shallow={true}
          className={`rounded-lg p-3 text-2xl text-secondary-color hover:text-secondary-color-dark ${
            view === "compare" ? "bg-primary-color" : ""
          }`}
        >
          Compare
        </Link>
      </div>
    </>
  );
};

export default Nav;
