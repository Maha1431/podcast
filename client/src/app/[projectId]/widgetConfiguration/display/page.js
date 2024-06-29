"use client";

import DropDown from "@/components/ui/DropDown";
import Switch from "@/components/ui/Switch";
import {
  getProjectDisplayConfig,
  updateDisplayConfiguration,
} from "@/store/slices/project";
import { Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Page() {
  const [editIsOn, setEditIsOn] = useState(false);
  const [image, setImage] = useState(null);
  const displayConfig = useSelector(getProjectDisplayConfig);
  const [newDisplayConfig, setNewDisplayConfig] = useState({});
  const { projectId } = useParams();
  // console.log(displayConfig);

  const positionOptions = [
    "bottom right",
    "top right",
    "bottom left",
    "top left",
  ];

  useEffect(() => {
    setNewDisplayConfig(displayConfig);
  }, [displayConfig]);

  async function handleSaveDisplayConfig() {
    let formData;
    if (image) {
      formData = new FormData();

      formData.append("botIconImage", image);
    }

    await updateDisplayConfiguration(projectId, formData, newDisplayConfig);

    setEditIsOn(false);
  }

  return (
    <div className="grid grid-rows-2 my-4">
      <div className="grid grid-cols-2 gap-x-20 gap-y-10 border-b-2 pb-12 border-slate-300">
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Primary color</span>
          <div className="flex w-full gap-3">
            <input
              type="text"
              disabled={editIsOn === false}
              value={newDisplayConfig.primaryColor}
              onChange={(e) =>
                setNewDisplayConfig((newDisplayConfig) => {
                  return { ...newDisplayConfig, primaryColor: e.target.value };
                })
              }
              className="focus:outline-none border border-slate-400 rounded-md w-full px-2"
            />
            <div
              style={{ backgroundColor: newDisplayConfig.primaryColor }}
              className="py-2 px-3 rounded-md border border-slate-500"
            ></div>
          </div>
          <p className="text-sm text-slate-500">
            Lorem ipsuim dolor sit Lorem ipsuim dolor sit
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">Font color</span>
          <div className="flex w-full gap-3">
            <input
              type="text"
              value={newDisplayConfig.fontColor}
              disabled={editIsOn === false}
              onChange={(e) =>
                setNewDisplayConfig((newDisplayConfig) => {
                  return { ...newDisplayConfig, fontColor: e.target.value };
                })
              }
              className="focus:outline-none border border-slate-400 rounded-md w-full px-2"
            />
            <div
              style={{ backgroundColor: newDisplayConfig.fontColor }}
              className="py-2 px-3 rounded-md  border border-slate-500"
            ></div>
          </div>
          <p className="text-sm text-slate-500">
            Lorem ipsuim dolor sit Lorem ipsuim dolor sit
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">Font Size</span>
          <div className="flex w-full gap-3">
            <input
              type="text"
              value={newDisplayConfig.fontSize}
              disabled={editIsOn === false}
              onChange={(e) =>
                setNewDisplayConfig((newDisplayConfig) => {
                  return { ...newDisplayConfig, fontSize: e.target.value };
                })
              }
              className="focus:outline-none border border-slate-400 rounded-md w-full px-2"
            />
          </div>
          <p className="text-sm text-slate-500">
            Lorem ipsuim dolor sit Lorem ipsuim dolor sit
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">Chat Height </span>
          <div className="flex w-full gap-3">
            <input
              type="text"
              value={newDisplayConfig.chatHeight}
              disabled={editIsOn === false}
              onChange={(e) =>
                setNewDisplayConfig((newDisplayConfig) => {
                  return { ...newDisplayConfig, chatHeight: e.target.value };
                })
              }
              className="focus:outline-none border border-slate-400 rounded-md w-full px-2"
            />
          </div>
          <p className="text-sm text-slate-500">
            Lorem ipsuim dolor sit Lorem ipsuim dolor sit
          </p>
        </div>

        <div className=" flex justify-between items-center col-span-2">
          <div>
            <span className="font-semibold">Show Sources</span>
            <p className="text-sm text-slate-500">
              Lorem ipsuim dolor sit Lorem ipsuim dolor sit
            </p>
          </div>
          <div>
            <Switch
              newDisplayConfig={newDisplayConfig}
              setNewDisplayConfig={setNewDisplayConfig}
              disabled={editIsOn === false}
            />
          </div>
        </div>
      </div>
      <div className="py-6">
        <span className="text-violet-700 font-semibold">Chat Icon</span>
        <div className="grid grid-cols-2 py-4 gap-x-20 gap-y-10">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Chat Icon Size</span>
            <div className="flex w-full gap-3">
              <input
                type="text"
                value={newDisplayConfig.chatIconSize}
                disabled={editIsOn === false}
                onChange={(e) =>
                  setNewDisplayConfig((newDisplayConfig) => {
                    return {
                      ...newDisplayConfig,
                      chatIconSize: e.target.value,
                    };
                  })
                }
                className="focus:outline-none border border-slate-400 rounded-md w-full px-2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Position on Screen </span>
            <div className="flex w-full gap-3">
              <DropDown
                options={positionOptions}
                disabled={editIsOn === false}
                newDisplayConfig={newDisplayConfig}
                setNewDisplayConfig={setNewDisplayConfig}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Distance from Bottom</span>
            <div className="flex w-full gap-3">
              <input
                type="text"
                disabled={editIsOn === false}
                value={newDisplayConfig.distanceFromBottom}
                onChange={(e) =>
                  setNewDisplayConfig((newDisplayConfig) => {
                    return {
                      ...newDisplayConfig,
                      distanceFromBottom: e.target.value,
                    };
                  })
                }
                className="focus:outline-none border border-slate-400 rounded-md w-full px-2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Horizontal Distance</span>
            <div className="flex w-full gap-3">
              <input
                type="text"
                value={newDisplayConfig.horizontalDistance}
                disabled={editIsOn === false}
                onChange={(e) =>
                  setNewDisplayConfig((newDisplayConfig) => {
                    return {
                      ...newDisplayConfig,
                      horizontalDistance: e.target.value,
                    };
                  })
                }
                className="focus:outline-none border border-slate-400 rounded-md w-full px-2"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col w-1/4">
              <span className="font-semibold">Bot Icon</span>
              <img
                src={newDisplayConfig.botIconImageName}
                className="w-12 h-12 rounded-full"
              ></img>
            </div>
            <div className="flex w-full gap-3  items-center">
              {/* <input
                type="text"
                className="focus:outline-none border border-slate-400 rounded-md w-full px-2"
              /> */}
              <input
                className="hidden"
                type="file"
                id="file-input"
                name="botIconImage"
                accept="image/*"
                disabled={editIsOn === false}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <label
                htmlFor="file-input"
                disabled={editIsOn === false}
                className={` bg-violet-700 flex justify-center items-center ${
                  editIsOn && "cursor-pointer"
                } text-white gap-2 p-2 rounded-xl font-semibold`}
              >
                Upload Image <Upload />
              </label>
              {image && <span>Got Image: {image.name}</span>}
            </div>
          </div>
          <div className=" flex justify-end items-center gap-4">
            {editIsOn ? (
              <>
                <button
                  onClick={() => {
                    setNewDisplayConfig(displayConfig);
                    setEditIsOn(false);
                  }}
                  className="border border-red-500 text-red-500 px-2 py-1 rounded-md font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveDisplayConfig}
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
    </div>
  );
}

export default Page;
