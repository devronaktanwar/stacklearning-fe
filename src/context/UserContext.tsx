import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  user: any;
  setUser:any
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>({
    isLoggedIn: false,
  });

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const response = await axios.post(
        "https://stacklearning-be-h0pq.onrender.com/api/get-user-details",
        { userId }
      );
      setUser({...response.data.user,isLoggedIn:true});
    } catch (err) {
      console.log("something went wrong");
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <UserContext.Provider value={{ user,setUser }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
