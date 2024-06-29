"use client";

import { Bell, PlusCircle, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import { STORAGE_KEY, useAuth } from "@/contexts/userAuth";
import AxiosClient from "@/utils/axios";
import Link from "next/link";
import { createProject } from "@/store/slices/project";

export default function Home() {
  const { user, login, logout } = useAuth();
  const isLoggedIn = user._id !== "";

  const [email, setEmail] = useState("");

  const [createProjectModelIsOpen, setCreateProjectModelIsOpen] =
    useState(false);

  const [projectName, setProjectName] = useState("");

  const [projects, setProjects] = useState([]);

  const backgroundStyle = {
    backgroundImage: 'url("/directright.svg")', // Specify the path to your background image
    backgroundSize: "cover", // Adjust as needed
    backgroundPosition: "center center", // Adjust as needed
    backgroundRepeat: "no-repeat", // Adjust as needed
    height: "50%", // Set a height for your element
    // Add other styles as needed
  };

  async function handleLogin(e) {
    e.preventDefault();
    const res = await login(email);
  }

  async function handleProjectCreation(e) {
    e.preventDefault();
    const project = await createProject(projectName);
    setProjects((projects) => [...projects, project]);
    setCreateProjectModelIsOpen(false);
  }

  useEffect(() => {
    async function getProjects() {
      const userId = localStorage.getItem(STORAGE_KEY);
      const res = await AxiosClient.get("/user/projects", {
        headers: {
          Authorization: userId,
        },
      }).catch((error) => error.response);

      console.log(res.data);

      if (res.status === 200) {
        console.log("got projects");
        setProjects(res.data.projects);
      }

      console.log(projects);

      return res;
    }

    const res = getProjects();
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {!isLoggedIn && (
        <Modal>
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center gap-2 bg-white p-2 w-2/6 rounded-lg "
          >
            <input
              className="border border-black focus:outline-none p-1 w-full"
              placeholder="Enter Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-violet-500 text-white p-2 w-1/2 rounded-full">
              Login
            </button>
          </form>
        </Modal>
      )}

      {createProjectModelIsOpen && (
        <Modal>
          <form
            className="bg-white w-1/2 rounded-lg flex flex-col gap-4 p-4 "
            onSubmit={handleProjectCreation}
          >
            <span className="text-lg font-bold">Create Project</span>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-500" htmlFor="">
                Enter Project Name
              </label>
              <input
                className="p-2 focus:outline-none border border-slate-400 rounded-md"
                type="text"
                placeholder="Type Here"
                onChange={(e) => setProjectName(e.target.value)}
              />
              <span className="text-sm text-red-500">
                Project Name Can't be empty
              </span>
            </div>

            <div className="w-full flex items-end justify-end gap-3">
              <button
                type="button"
                onClick={() => setCreateProjectModelIsOpen(false)}
                className="border border-red-500 text-red-500 px-2 py-1 rounded-md hover:border-white hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                disabled={projectName === ""}
                type="submit"
                className={`border border-violet-700  text-white px-2 py-1 rounded-md ${
                  projectName === ""
                    ? "bg-violet-300"
                    : "hover:bg-violet-500 bg-violet-700 cursor-pointer"
                } transition-all duration-200 ease-in-out `}
              >
                Create
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div className=" w-full flex items-center justify-between absolute top-0 left-0 right-0 h-18 p-2">
        <div className="flex items-center gap-1 z-10 pl-6">
          <img src="directright.svg" width="30px" height="30px" alt="LOGO" />
          <span className="text-violet-500 font-bold text-xl">LAMA</span>
        </div>
        <div className="flex pr-6">
          <span className="p-2">
            <Settings />
          </span>

          <span className="p-2">
            <Bell />
          </span>

          <button
            onClick={logout}
            className="p-2 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="font-bold text-4xl text-violet-700">
            Create a New Project
          </p>
          <img
            src="cuate.png"
            width="250px"
            height="250px"
            alt="Lama Podcast image"
          />

          <div className="w-3/5 text-center text-stone-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </div>

          <div>
            <button
              onClick={() => setCreateProjectModelIsOpen(true)}
              className="flex bg-black p-2 px-4 text-white gap-2 rounded-md border border-black hover:bg-white hover:text-black transition-all duration-200 ease-in-out"
            >
              <PlusCircle />
              Create New Project
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col justify-start items-center px-32 py-16">
          <div className="flex w-full justify-between items-center">
            <span className="text-3xl font-bold text-violet-700">Projects</span>
            <button
              onClick={() => setCreateProjectModelIsOpen(true)}
              className="flex bg-black p-2 px-4 text-white gap-2 rounded-md border border-black hover:bg-white hover:text-black transition-all duration-200 ease-in-out"
            >
              <PlusCircle />
              Create New Project
            </button>
          </div>
          <div className="w-full grid grid-cols-3 gap-10 mt-4">
            {projects.map((project) => {
              let pfp;
              const projectNameArray = project.name.split(" ");
              if (projectNameArray.length > 1) {
                pfp = projectNameArray[0][0] + projectNameArray[1][0];
              } else {
                pfp = projectNameArray[0][0] + projectNameArray[0][1];
              }

              return (
                <Link
                  href={`/${project._id}/episodes`}
                  className="flex border border-black p-2 rounded-lg shadow-lg overflow-hidden overflow-ellipsis"
                >
                  <div className=" p-4 rounded-lg bg-violet-500 text-5xl font-bold text-white">
                    {pfp.toUpperCase()}
                  </div>
                  <div className="pl-4 flex flex-col justify-around ">
                    <div className="flex flex-col">
                      <span className="text-violet-700 text-sm font-semibold whitespace-nowrap">
                        {project.name}
                      </span>
                      <span className="text-xs ">
                        {project.episodes.length} episodes
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Last edited a week ago
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
