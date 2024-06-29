"use client";

import EpisodeCreationForm from "../../../Components/EpisodeCreationForm";
import Card from "../../../Components/ui/Card";
import CardsLayout from "../../../Components/ui/CardsLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Modal from "@/components/ui/Modal";
import {
  addEpisode,
  deleteEpisode,
  getLoadingState,
  getProject,
  getProjectEpisodes,
  removeEpisode,
  setIsLoading,
} from "@/store/slices/project";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const isLoading = useSelector(getLoadingState);
  const project = useSelector(getProject);
  const dispatch = useDispatch();
  const [episodeModelIsOpen, setEpisodeModelIsOpen] = useState(false);

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  async function handleDeleteEpisode(episodeId) {
    dispatch(setIsLoading(true));
    await deleteEpisode(project._id, episodeId);
    dispatch(removeEpisode(episodeId));
    dispatch(setIsLoading(false));
  }

  if (project.episodes?.length === 0) {
    return (
      <div>
        {episodeModelIsOpen && (
          <Modal>
            <EpisodeCreationForm
              setEpisodeModelIsOpen={setEpisodeModelIsOpen}
            />
          </Modal>
        )}

        <span className="font-bold text-2xl text-violet-700">Upload</span>

        <div className="grid grid-rows-2 py-4">
          <div className="flex flex-col gap-6 ">
            <CardsLayout>
              <Card
                onClick={() => setEpisodeModelIsOpen(true)}
                item={"Youtube Video"}
                imgLength={50}
                imgSrc={"/Frame 1.png"}
              />
              <Card
                onClick={() => setEpisodeModelIsOpen(true)}
                item={"Spotify Podcast"}
                imgLength={50}
                imgSrc={"/Frame 2.png"}
              />
              <Card
                onClick={() => setEpisodeModelIsOpen(true)}
                item={"RSS Feed"}
                imgLength={50}
                imgSrc={"/image 1.png"}
              />
              <Card
                onClick={() => setEpisodeModelIsOpen(true)}
                item={"Youtube Video"}
                imgLength={50}
                imgSrc={"/Frame 1.png"}
              />
              <Card
                onClick={() => setEpisodeModelIsOpen(true)}
                item={"Spotify Podcast"}
                imgLength={50}
                imgSrc={"/Frame 2.png"}
              />
              <Card
                onClick={() => setEpisodeModelIsOpen(true)}
                item={"RSS Feed"}
                imgLength={50}
                imgSrc={"/image 1.png"}
              />
            </CardsLayout>
            <div className="w-full flex justify-center items-center">
              <span className="text-slate-400">or</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center border-dashed border border-slate-700 rounded-xl mt-2 mb-4">
            <img
              src="/cloud_upload.png"
              height={50}
              width={50}
              alt="cloud upload"
            />
            <div className="text-center">
              <p>
                Select a file or drag and drop here (Podcast Media or
                Transcription Text)
              </p>
              <p className="text-sm text-slate-400">
                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file{" "}
              </p>
            </div>
            <button
              onClick={() => setEpisodeModelIsOpen(true)}
              className="border border-violet-800 text-violet-800 rounded-full py-2 px-4 font-bold hover:bg-violet-800 hover:text-white transition-all duration-200 ease-in-out"
            >
              Select File
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {episodeModelIsOpen && (
        <Modal>
          <EpisodeCreationForm setEpisodeModelIsOpen={setEpisodeModelIsOpen} />
        </Modal>
      )}
      <span className="font-bold text-3xl text-violet-700 mb-4">
        {project.name}
      </span>
      <div className="flex gap-8">
        <Card
          onClick={() => setEpisodeModelIsOpen(true)}
          className="w-52"
          item={"Youtube Video"}
          imgLength={50}
          imgSrc={"/Frame 1.png"}
          alone={true}
        />
        <Card
          onClick={() => setEpisodeModelIsOpen(true)}
          className="w-52"
          item={"Spotify Podcast"}
          imgLength={50}
          imgSrc={"/Frame 2.png"}
          alone={true}
        />
        <Card
          onClick={() => setEpisodeModelIsOpen(true)}
          className="w-52"
          item={"RSS Feed"}
          imgLength={50}
          imgSrc={"/image 1.png"}
          alone={true}
        />
      </div>

      <div className="bg-violet-700 p-4 flex items-center justify-between rounded-lg">
        <p className="text-white font-semibold">
          All files are processed! Your widget is ready to go!
        </p>
        <button className="px-2 py-1 bg-white rounded-lg">Try it out!</button>
      </div>

      <div className="grid grid-cols-4 justify-center items-center  mb-8  border-x border-t rounded-lg border-slate-300">
        <div className="p-4 font-semibold">Name</div>
        <div className="p-4 font-semibold">Upload Date & Time</div>
        <div className="p-4 font-semibold">Status</div>
        <div className="p-4 font-semibold">Actions</div>
        {project.episodes?.map((episode, idx) => {
          const isLast = project.episodes?.length === idx;
          console.log(isLast);
          const dateObj = new Date(episode?.uploadTimeStamp);
          const month = dateObj.toString().split(" ")[1];
          const date = dateObj.getDate();
          const year = dateObj
            .getFullYear()
            .toString()
            .split("")
            .slice(2)
            .join("");
          const hours = dateObj.getHours();
          const minutes = dateObj.getMinutes();

          return (
            <>
              <div className={` border-y border-slate-300 p-4`}>
                <span className="border border-white p-2">{episode.name}</span>
              </div>
              <div className=" border-y border-slate-300 p-4">
                <span className="border border-white p-2">
                  {date} {month} {year} | {hours}: {minutes}
                </span>
              </div>
              <div className=" border-y border-slate-300 p-4">
                <span className="border border-white p-2">Done</span>
              </div>
              <div className={` border-y border-slate-300 p-4 `}>
                <Link
                  href={`episodes/${episode._id}/transcript`}
                  className="border rounded-l-lg border-slate-400 p-2"
                >
                  Edit
                </Link>
                <span
                  onClick={() => handleDeleteEpisode(episode._id)}
                  className="border-y cursor-pointer border-r rounded-r-lg text-red-500 border-slate-400 p-2 hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out"
                >
                  Delete
                </span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
