"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Layout({ children }) {
  const fullpath = usePathname().split("/");

  const currPath = fullpath[fullpath.length - 1];
  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-slate-500">
        <span className="font-bold text-2xl text-violet-700">
          Configuration
        </span>

        <div className="flex gap-8">
          <Link
            href={"general"}
            className={`${
              currPath === "general" &&
              "border-b-4 border-violet-700 text-violet-700 font-semibold"
            } px-3`}
          >
            General
          </Link>
          <Link
            href={"display"}
            className={`${
              currPath === "display" &&
              "border-b-4 border-violet-700 text-violet-700 font-semibold"
            } px-3 `}
          >
            Display
          </Link>
          <span
            className={`${
              currPath === "advanced" &&
              "border-b-4 border-violet-700 text-violet-700 font-semibold"
            } px-3 `}
          >
            Advanced
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
