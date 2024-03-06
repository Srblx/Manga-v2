import { useState, useEffect } from "react";


export default function useLocalStorage<T>(storageKey: string, initialState: T) { 
  const [state, setInternalState] = useState<T>(initialState);

  useEffect(() => {
    const storageInBrowser = localStorage.getItem(storageKey);

    if (storageInBrowser) {
      setInternalState(JSON.parse(storageInBrowser));
    }
  }, []);

  const setState = (newState: T) => {
    localStorage.setItem(storageKey, JSON.stringify(newState));
    setInternalState(newState);
  };

  return [state, setState] as const;
}

// const App: React.FC = () => {
//   const [user, setUser] = useLocalStorage<User>("user", {
//     name: "",
//     email: "",
//   });