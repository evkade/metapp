import { useState, useEffect } from "react";

// functionality of the customHook inspired from the blogpost https://blog.logrocket.com/using-localstorage-react-hooks/

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem(key, window.location.pathname);
    };
  }, [key, value]);

  return [value, setValue];
};
