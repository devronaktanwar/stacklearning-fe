import CircularLoader from "@/components/CircularLoader";
import { createContext, useContext, useState, FC, ReactNode } from "react";

interface JobFilterContextType {
  selectedJobLocationType: string;
  setSelectedJobLocationType: (location: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedDomain: string;
  setSelectedDomain: (domain: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  selectedJobType: string;
  setselectedJobType: (jobtype: string) => void;
  selectedCities: string[];
  setSelectedCities: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCompanies: string[];
  setSelectedCompanies: React.Dispatch<React.SetStateAction<string[]>>;
  handleCitySelect: any;
  handleRemoveCity: any;
  selectedExperience: string;
  setSelectedExperience: (experience: string) => void;
  handleCompanySelect: any;
  handleRemoveCompany: any;
  filterApplied: boolean;
  setFilterApplied: (val: boolean) => void;
  setLoading: (val: boolean) => void;
}

const JobFilterContext = createContext<JobFilterContextType | undefined>(
  undefined
);

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
  const [selectedJobLocationType, setSelectedJobLocationType] = useState("Any");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDomain, setSelectedDomain] = useState("Any");
  const [selectedPeriod, setSelectedPeriod] = useState("any");
  const [selectedJobType, setselectedJobType] = useState("Any");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const overlayStyle = {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };
  if (loading) {
    return (
      <div style={overlayStyle}>
        <CircularLoader />
      </div>
    );
  }
  const handleCitySelect = (city: string) => {
    if (!selectedCities.includes(city)) {
      setSelectedCities((prev) => [...prev, city]);
    }
  };

  const handleRemoveCity = (city: string) => {
    setSelectedCities((prev) => prev.filter((item) => item !== city));
  };
  const handleCompanySelect = (city: string) => {
    if (!selectedCities.includes(city)) {
      setSelectedCompanies((prev) => [...prev, city]);
    }
  };

  const handleRemoveCompany = (city: string) => {
    setSelectedCompanies((prev) => prev.filter((item) => item !== city));
  };

  return (
    <JobFilterContext.Provider
      value={{
        selectedCities,
        setSelectedCities,
        selectedJobLocationType,
        setSelectedJobLocationType,
        selectedDomain,
        setSelectedDomain,
        selectedPeriod,
        setSelectedPeriod,
        selectedJobType,
        setselectedJobType,
        selectedLocation,
        setSelectedLocation,
        handleCitySelect,
        handleRemoveCity,
        setSelectedExperience,
        selectedExperience,
        selectedCompanies,
        setSelectedCompanies,
        handleCompanySelect,
        handleRemoveCompany,
        filterApplied,
        setFilterApplied,
        setLoading,
      }}
    >
      {children}
    </JobFilterContext.Provider>
  );
};
