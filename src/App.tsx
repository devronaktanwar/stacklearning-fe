import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { JobFilterProvider } from "./context/JobFilterContext";
import JobBoardPage from "./pages/JobBoardPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
import { SavedJobsProvider } from "./context/SavedJobsContext";
const App = () => {
  return (
    <div>
      <Navbar />
      <JobFilterProvider>
        <SavedJobsProvider emailAddress={"ronaktanwar0508@gmail.com"}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/job-board" element={<JobBoardPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </SavedJobsProvider>
      </JobFilterProvider>
    </div>
  );
};

export default App;
