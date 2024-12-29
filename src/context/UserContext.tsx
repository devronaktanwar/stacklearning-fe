import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import BASE_URL from "../../config";
interface UserContextType {
  user: any;
  setUser: any;
  updateSavedJobs: (newJobs: any[]) => void;
  updateAppliedJobs: (appliedJobs: any[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>({
    isLoggedIn: false,
    savedJobs: [],
  });

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const response = await axios.post(`${BASE_URL}/api/get-user-details`, {
        userId,
      });
      setUser({ ...response.data.user, isLoggedIn: true });
    } catch (err) {
      console.log("something went wrong");
    }
  };

  const updateSavedJobs = (newJobs: any[]) => {
    setUser((prev: any) => ({
      ...prev,
      savedJobs: newJobs,
    }));
  };
  const updateAppliedJobs = (appliedJobs: any[]) => {
    setUser((prev: any) => ({
      ...prev,
      appliedJobs: appliedJobs,
    }));
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, updateSavedJobs, updateAppliedJobs }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
