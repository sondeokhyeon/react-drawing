import { STR_SHAPE } from "@/types/STRUCTURES";
import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialState: STR_SHAPE[] | []) => {
  const [data, setData] = useState(
    () =>
      JSON.parse(
        window.localStorage.getItem(key) ?? JSON.stringify(initialState),
      ) || [],
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  const clearData = () => {
    window.localStorage.removeItem(key);
    setData([]);
  };

  return { data, setData, clearData };
};

export default useLocalStorage;
