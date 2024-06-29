"use client";

import { useAuth } from "@/contexts/userAuth";
import { useEffect, useState } from "react";

function Page() {
  const [editIsOn, setEditIsOn] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const { user, updateUserName } = useAuth();

  useEffect(() => {
    setNewUsername(user.name);
  }, [user]);

  async function handleSaveUserName() {
    await updateUserName(newUsername);
    setEditIsOn(false);
  }
  return (
    <div className="flex flex-col gap-7">
      <span className="font-bold text-2xl text-violet-700">
        Account Settings
      </span>

      <div className="grid grid-cols-5 gap-4 items-center justify-start">
        <div className="col-span-1 flex justify-center">
          <img src="/Ellipse 21.png" height={100} width={100} alt="pfp" />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label className="font-semibold">User Name</label>
          <input
            type="text"
            value={newUsername}
            disabled={editIsOn === false}
            onChange={(e) => setNewUsername(e.target.value)}
            className="focus:outline-none border border-slate-400 rounded-md w-full px-2 py-1"
          />

          <div className=" flex justify-start gap-4">
            {editIsOn ? (
              <>
                <button
                  onClick={() => {
                    setEditIsOn(false);
                  }}
                  className="border border-red-500 text-red-500 px-2 py-1 rounded-md font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveUserName}
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

        <div className="col-span-2 flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input
            type="text"
            value={user.email}
            disabled={true}
            className="focus:outline-none border border-slate-400 rounded-md w-full px-2 py-1"
          />
          <button className=" text-white   px-2 py-1 rounded-md font-semibold cursor-default ">
            Discard
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="font-bold text-2xl text-violet-700">
          Subscriptions
        </span>

        <div className="flex p-4 bg-violet-700 items-center justify-between rounded-lg">
          <p className="text-white">
            You are currently on the Ques AI Basic Plan!
          </p>
          <span className="p-2 bg-white rounded-md font-semibold text-violet-700">
            Upgrade
          </span>
        </div>
        <span className="text-red-500 underline font-semibold">
          Cancel Subscriptions
        </span>
      </div>
    </div>
  );
}

export default Page;
