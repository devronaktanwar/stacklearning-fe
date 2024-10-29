import { createContext, useContext, useState, FC, ReactNode } from "react";

interface JobFilterContextType {
  selectedJobLocation: string;
  setSelectedJobLocation: (location: string) => void;
  selectedDomain: string;
  setSelectedDomain: (domain: string) => void;
}


const JobFilterContext = createContext<JobFilterContextType | undefined>(undefined);

export const useJobFilter = () => {
  const context = useContext(JobFilterContext);
  if (!context) {
    throw new Error("useJobFilter must be used within a JobFilterProvider");
  }
  return context;
};

interface JobFilterProviderProps {
  children: ReactNode;
}

export const JobFilterProvider: FC<JobFilterProviderProps> = ({ children }) => {
  const [selectedJobLocation, setSelectedJobLocation] = useState("Any");
  const [selectedDomain, setSelectedDomain] = useState("Any");

  return (
    <JobFilterContext.Provider value={{ selectedJobLocation, setSelectedJobLocation, selectedDomain, setSelectedDomain }}>
      {children}
    </JobFilterContext.Provider>
  );
};
