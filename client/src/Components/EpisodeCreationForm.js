import {
  addEpisode,
  createEpisode,
  setIsLoading,
} from "../store/slices/project";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

function EpisodeCreationForm({ setEpisodeModelIsOpen }) {
  const { projectId } = useParams();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const dispatch = useDispatch();

  async function handleEpisodeCreation(e) {
    e.preventDefault();
    dispatch(setIsLoading(true));
    const episode = await createEpisode(projectId, name, link);
    dispatch(setIsLoading(false));
    dispatch(addEpisode(episode));
    setEpisodeModelIsOpen(false);
  }
  return (
    <form
      onSubmit={handleEpisodeCreation}
      className="flex flex-col gap-3 justify-center items-center bg-white w-1/2 p-8 rounded-lg"
    >
      <div className=" w-full flex items-center justify-between">
        <div className="font-bold text-xl flex items-center justify-center gap-2">
          <img height={40} width={40} src="/Frame 1.png" />
          <span>Upload from Youtube</span>
        </div>
        <span
          onClick={() => setEpisodeModelIsOpen(false)}
          className="cursor-pointer rounded-full p-1 hover:bg-slate-200 transition-all duration-200 ease-in-out"
        >
          <X />
        </span>
      </div>
      <div className="w-full flex flex-col gap-1">
        <label className="" htmlFor="">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-500 rounded-md text-lg focus:outline-none p-2"
          type="text"
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label className="" htmlFor="">
          Link
        </label>
        <input
          onChange={(e) => setLink(e.target.value)}
          className="border border-slate-500 rounded-md text-lg focus:outline-none p-2"
          type="text"
        />
      </div>
      <div className="w-full flex items-center justify-end">
        <button
          className="bg-black border border-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-all duration-200 ease-in-out"
          type="submit"
        >
          Upload
        </button>
      </div>
    </form>
  );
}

export default EpisodeCreationForm;
