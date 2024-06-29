import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function DropDown({
  options,
  disabled,
  newDisplayConfig,
  setNewDisplayConfig,
}) {
  //   const ans = useSelector();
  const dispatch = useDispatch();
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return (
    <div className="flex w-full">
      <div className="relative w-full">
        <button
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          disabled={disabled}
          className=" p-1 w-full border border-slate-500  rounded-md text-sm flex justify-between"
        >
          <span className=""> {newDisplayConfig.positionOnScreen}</span>
          <span className="">
            {" "}
            <ChevronDown />
          </span>
        </button>

        <div
          className={`absolute bg-white mt-2 left-0 right-0 ${
            isSelectOpen ? "flex flex-col" : "hidden"
          } `}
        >
          {options.map((option, idx) => {
            return (
              <span
                className="p-2 hover:bg-slate-500 hover:text-white cursor-pointer text-sm transition-all duration-200 ease-in-out"
                key={idx}
                onClick={() => {
                  setNewDisplayConfig((newDisplayConfig) => {
                    return {
                      ...newDisplayConfig,
                      positionOnScreen: options[idx],
                    };
                  });
                  setIsSelectOpen(false);
                }}
              >
                {option || (
                  <span className="italic text-slate-500">Empty Option</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
      {/* <span className="self-center ml-6 text-base border-b-2 border-indigo-600">
        {options[ans] || (
          <span className="italic text-slate-500">Empty Option</span>
        )}
      </span> */}
    </div>
  );
}

export default DropDown;
