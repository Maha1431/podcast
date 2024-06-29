"use client";

import {
  getProjectGeneralConfig,
  setIsLoading,
  updateGeneralConfig,
  updateGeneralConfiguration,
} from "@/store/slices/project";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const generalConfig = useSelector(getProjectGeneralConfig);
  const [newGeneralConfig, setNewGeneralConfig] = useState({});
  const [editIsOn, setEditIsOn] = useState(false);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    setNewGeneralConfig(generalConfig);
  }, [generalConfig]);

  async function handleSaveGeneralConfig() {
    dispatch(setIsLoading(true));
    const { chatbotName, welcomeMessage, inputPlaceholder } =
      await updateGeneralConfiguration(projectId, newGeneralConfig);
    setEditIsOn(false);
    dispatch(
      updateGeneralConfig({ chatbotName, welcomeMessage, inputPlaceholder })
    );
    dispatch(setIsLoading(false));
  }

  return (
    <div className="my-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-semibold">Chatbot Name</label>
          <input
            disabled={editIsOn === false}
            value={newGeneralConfig.chatbotName}
            className="border border-slate-500 focus:outline-none rounded-md py-1 px-2"
            type="text"
            onChange={(e) =>
              setNewGeneralConfig((newGeneralConfig) => {
                return { ...newGeneralConfig, chatbotName: e.target.value };
              })
            }
          />
          <p className="text-sm text-slate-500">
            Lorem ipsuim dolor sit Lorem ipsuim dolor sit
          </p>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Welcome Message</label>
          <input
            disabled={editIsOn === false}
            value={newGeneralConfig.welcomeMessage}
            className="border border-slate-500 focus:outline-none rounded-md py-1 px-2"
            type="text"
            onChange={(e) =>
              setNewGeneralConfig((newGeneralConfig) => {
                return { ...newGeneralConfig, welcomeMessage: e.target.value };
              })
            }
          />
          <p className="text-sm text-slate-500">
            Lorem ipsuim dolor sit Lorem ipsuim dolor sit
          </p>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Input Placeholder</label>
          <input
            disabled={editIsOn === false}
            value={newGeneralConfig.inputPlaceholder}
            className="border border-slate-500 focus:outline-none rounded-md py-1 px-2"
            type="text"
            onChange={(e) =>
              setNewGeneralConfig((newGeneralConfig) => {
                return {
                  ...newGeneralConfig,
                  inputPlaceholder: e.target.value,
                };
              })
            }
          />
          <p className="text-sm text-slate-500">
            Lorem ipsuim dolor sit Lorem ipsuim dolor sit
          </p>
        </div>
        <div className="flex items-center justify-start gap-3">
          {editIsOn ? (
            <>
              <button
                onClick={() => {
                  setNewGeneralConfig(generalConfig);
                  setEditIsOn(false);
                }}
                className="border border-red-500 text-red-500 px-2 py-1 rounded-md font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
              >
                Discard
              </button>
              <button
                onClick={handleSaveGeneralConfig}
                className="bg-black text-white px-2 py-1 rounded-md hover:shadow-lg"
              >
                Save & Exit
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditIsOn(true)}
              className="hover:bg-violet-500 hover:text-white px-2.5 py-1 rounded-sm border border-violet-700 text-violet-700 transition-all duration-300 ease-in-out"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
