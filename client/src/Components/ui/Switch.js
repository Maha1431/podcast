import { useState } from "react";

function Switch({ newDisplayConfig, setNewDisplayConfig, disabled }) {
  const [isOn, setIsOn] = useState(newDisplayConfig?.showSources);
  return (
    <button
      disabled={disabled}
      onClick={() => {
        // setIsOn(!isOn);
        setNewDisplayConfig((newDisplayConfig) => {
          return {
            ...newDisplayConfig,
            showSources: !newDisplayConfig.showSources,
          };
        });
      }}
      className={`flex w-10 h-5  rounded-full  ${
        newDisplayConfig?.showSources ? "bg-indigo-500" : "bg-slate-600"
      } transition-all duration-300 ease-in-out`}
    >
      <span
        className={`h-5 w-5 bg-white border-2 border-indigo-500 rounded-full shadow-2xl ${
          !disabled && "cursor-pointer hover:ring-8 ring-indigo-400"
        } ${
          newDisplayConfig?.showSources && "ml-5"
        }  transition-all duration-300 ease-in-out`}
      ></span>
    </button>
  );
}

export default Switch;
