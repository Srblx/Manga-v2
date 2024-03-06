import { createContext, useContext } from "react";
import { User } from "../interfaces/LoginSignUpInterface";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextProps>({
  user: null,

  setUser: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


export default UserContext;
