"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NameForm() {
  const router = useRouter();
  const [route, setRoute] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("profile/" + route);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          id="name"
          name="route"
          onChange={(e) => setRoute(e.target.value)}
          className="block w-full h-12 p-4 text-sm text-secondary-color border border-secondary-color rounded-l-lg bg-primary-color"
          placeholder="Anilist Username"
        />
        <button
          type="submit"
          className="text-primary-color bg-secondary-color hover:bg-secondary-color-dark focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-r-lg text-sm px-4 py-2 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

