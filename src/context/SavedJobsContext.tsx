import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface lSavedJobProps{
    jobId:string
}

interface SavedJobsContextType {
  savedJobs: lSavedJobProps[];
  saveJob: (jobId: string) => Promise<void>;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export const useSavedJobs = (): SavedJobsContextType => {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used within a SavedJobsProvider");
  }
  return context;
};

interface SavedJobsProviderProps {
  children: ReactNode;
  emailAddress: string;
}

export const SavedJobsProvider: React.FC<SavedJobsProviderProps> = ({ children, emailAddress }) => {
  const [savedJobs, setSavedJobs] = useState<lSavedJobProps[]>([]);
console.log("saved jobs are--",savedJobs)
  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get<{ savedJobs: lSavedJobProps[] }>(`/jobs/saved/${emailAddress}`);
      setSavedJobs(response.data.savedJobs);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const saveJob = async (jobId: string) => {
    try {
      await axios.post('https://stacklearning-be.onrender.com/api/jobs/save', { emailAddress, jobId });
      setSavedJobs((prev) => [...(prev || []), { jobId }]);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  useEffect(() => {
    if (emailAddress) fetchSavedJobs();
  }, [emailAddress]);

  return (
    <SavedJobsContext.Provider value={{ savedJobs, saveJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};
