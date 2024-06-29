"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function Sidebar({ children }) {
  const { projectId } = useParams();
  const fullpath = usePathname().split("/");

  const currPath = fullpath[fullpath.length - 1];
  return (
    <div className="fixed top-0 left-0 bottom-0 w-1/5 bg-violet-200 flex flex-col justify-between p-2 gap-4">
      <div className="flex flex-col gap-4">
        <Link href={"/"} className="flex items-center gap-1">
          <img src="/directright.svg" width="30px" height="30px" alt="LOGO" />
          <span className="text-violet-700 font-bold text-xl">LAMA.</span>
        </Link>

        <span className="text-sm">Podcast upload flow</span>

        <div className="flex flex-col gap-2">{children}</div>
      </div>
      <Link
        href={`/${projectId}/settings`}
        className={`flex justify-start items-center py-2 px-1 gap-2 text-slate-500 ${
          currPath === "settings" && "bg-violet-700 text-white rounded-full"
        }`}
      >
        <Settings />
        Settings
      </Link>
    </div>
  );
}

export default Sidebar;
