"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  getEpisode,
  getLoadingState,
  setIsLoading,
  updateEpisodeTranscript,
  updateTranscript,
} from "@/store/slices/project";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const { episodeId, projectId } = useParams();
  const isLoading = useSelector(getLoadingState);
  const episode = useSelector(getEpisode(episodeId));
  const [transcript, setTranscript] = useState("");
  const [editIsOn, setEditIsOn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTranscript(episode?.transcript);
  }, [episode]);

  async function handleSaveTranscript() {
    dispatch(setIsLoading(true));
    const episode = await updateEpisodeTranscript(
      projectId,
      episodeId,
      transcript
    );
    dispatch(
      updateTranscript({
        episodeId: episode._id,
        transcript: episode.transcript,
      })
    );
    dispatch(setIsLoading(false));
    setEditIsOn(false);
    console.log(episode);
  }

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-3 h-96">
      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl text-violet-700">
          Edit Transcript
        </span>
        {editIsOn && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTranscript(episode?.transcript);
                setEditIsOn(false);
              }}
              className="border border-red-500 text-red-500 px-2 py-1 rounded-md font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
            >
              Discard
            </button>
            <button
              onClick={handleSaveTranscript}
              className="bg-black text-white px-2 py-1 rounded-md hover:shadow-lg"
            >
              Save & Exit{" "}
            </button>
          </div>
        )}
      </div>

      <div className="h-full w-full border border-violet-700 rounded-lg p-3">
        <button
          onClick={() => setEditIsOn(true)}
          disabled={editIsOn === true}
          className="flex text-xs items-center justify-center gap-2 p-2 bg-gray-700 text-white rounded-full mb-2 hover:bg-gray-950 transition-all duration-200 ease-in-out"
        >
          <Pencil height={13} width={13} /> Edit Mode
        </button>
        <span className="text-violet-900 font-semibold mt-4">Speaker</span>
        <textarea
          value={transcript}
          disabled={editIsOn === false}
          className="focus:outline-none h-72 bg-white  w-full  overflow-y-scroll"
          onChange={(e) => setTranscript(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Page;
