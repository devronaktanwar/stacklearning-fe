import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  user: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  const fetchUserDetails=async()=>{
    try{
      const userId=localStorage.getItem("userId");
      const response=await axios.post("https://stacklearning-be-h0pq.onrender.com/api/get-user-details",{userId})
      setUser(response.data.user)
    }
    catch(err){
      console.log("something went wrong")
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])


  return (
    <UserContext.Provider value={{ user}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
