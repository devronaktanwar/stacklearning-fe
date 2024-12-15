import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { JobFilterProvider } from "./context/JobFilterContext";
import JobBoardPage from "./pages/JobBoardPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
import JobPage from "./pages/JobPage";
import MyAccountPage from "./pages/MyAccountPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import SavedJobPage from "./pages/SavedJobPage";
import ScrollToTop from "./components/ScrollToTop";
import SearchResultsPage from "./pages/SearchResultsPage";
const App = () => {
  return (
    <div>
      <Toaster position="bottom-center" />
      <Navbar />
      <ScrollToTop/>
      <JobFilterProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job-board" element={<JobBoardPage />} />
          <Route path="/jobs/:domain/:jobId" element={<JobPage />} />
          <Route path="/jobs/results" element={<SearchResultsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute>
                <SavedJobPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </JobFilterProvider>
    </div>
  );
};

export default App;
