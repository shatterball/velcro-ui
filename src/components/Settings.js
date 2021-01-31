import { useState } from "react";
import { useDispatch } from "react-redux";

import InputField from "./InputField";

import { defaultRpcConfig, addAlert } from "../lib/util";

const Settings = () => {
  const inputStyle =
    "w-full p-2 border border-gray-300 outline-none resize-none md:py-1 focus:border-blue-300";
  const dispatch = useDispatch();
  const tmpConfig = JSON.parse(localStorage.getItem("rpc-config"));
  const [config, setConfig] = useState(tmpConfig || defaultRpcConfig);

  return (
    <div className="flex flex-col items-center w-full overflow-y-auto text-sm fade-in">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          addAlert({
            dispatch,
            content: "Settings updated... Please refresh page.",
            priority: "success",
          });
          localStorage.setItem("rpc-config", JSON.stringify(config));
        }}
      >
        <InputField text="Hostname">
          <input
            defaultValue={config.host}
            className={inputStyle}
            onChange={(e) => {
              setConfig((oldConfig) => {
                return { ...oldConfig, host: e.target.value.trim() };
              });
            }}
          />
        </InputField>
        <InputField text="Port">
          <input
            defaultValue={config.port}
            className={inputStyle}
            onChange={(e) => {
              setConfig((oldConfig) => {
                return { ...oldConfig, port: parseInt(e.target.value.trim()) };
              });
            }}
          />
        </InputField>
        <InputField text="JsonRPC Path">
          <input
            defaultValue={config.path}
            className={inputStyle}
            onChange={(e) => {
              setConfig((oldConfig) => {
                return { ...oldConfig, path: e.target.value.trim() };
              });
            }}
          />
        </InputField>
        <div className="flex justify-start px-2 py-2 select-none md:px-4 space-x-2">
          <button
            className="px-4 py-1.5 font-medium text-blue-600 bg-blue-200 border border-blue-500 md:font-bold focus:outline-none disabled:opacity-50"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
