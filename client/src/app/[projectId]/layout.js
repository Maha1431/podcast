"use client";

import Sidebar from "@/components/ui/Sidebar";
import SidebarItem from "@/components/ui/SidebarItem";
import {
  getProjectById,
  getProjectName,
  setIsLoading,
  setProject,
} from "@/store/slices/project";
import { Bell, Home } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Layout({ children }) {
  const fullpath = usePathname().split("/");
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const currPath = fullpath[fullpath.length - 1];

  let page;

  console.log(currPath);

  if (currPath === "episodes") {
    page = "Upload";
  } else if (currPath === "transcript") {
    page = "Transcript";
  } else if (currPath === "general" || currPath === "display") {
    page = "Widget Configuration";
  } else if (currPath === "settings") {
    page = "Account Settings";
  }

  useEffect(() => {
    async function getProject() {
      dispatch(setIsLoading(true));
      const project = await getProjectById(projectId);
      dispatch(setProject(project));
      dispatch(setIsLoading(false));
    }

    getProject();
  }, [projectId]);

  const projectName = useSelector(getProjectName);

  console.log(projectName);

  return (
    <div className="grid grid-cols-5">
      <Sidebar>
        <SidebarItem
          index={1}
          name={"Project"}
          isActive={currPath === "episodes" || currPath === "transcript"}
          to={`/${projectId}/episodes`}
        />
        <SidebarItem
          index={2}
          name={"Widget Configuration"}
          isActive={currPath === "general" || currPath === "display"}
          to={`/${projectId}/widgetConfiguration/general`}
        />
        <SidebarItem
          index={3}
          name={"Deployment"}
          isActive={currPath === "deployment"}
          to={"/"}
        />
        <SidebarItem
          index={4}
          name={"Pricing"}
          isActive={currPath === "pricing"}
          to={"/"}
        />
      </Sidebar>
      <div className="col-span-1"></div>
      <div className="col-span-4 h-screen grid grid-rows-6 px-8">
        <div className="row-span-1 flex items-center justify-between gap-2">
          <div className="flex gap-2 items-center">
            <Link href={"/"} className="text-violet-700">
              <Home height={20} width={20} />
            </Link>
            {currPath !== "settings" && (
              <>
                <span className="text-lg font-bold text-slate-500">/</span>
                <span className="font-bold text-slate-500">{projectName}</span>
              </>
            )}
            <span className="text-lg font-bold text-slate-500">/</span>
            <span className="font-bold text-violet-700">{page}</span>
          </div>

          <Bell />
        </div>
        <div className=" row-span-5">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
