import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { JobFilterProvider } from "./context/JobFilterContext";
import JobBoardPage from "./pages/JobBoardPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
const App = () => {
  return (
    <JobFilterProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<JobBoardPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </JobFilterProvider>
  );
};

export default App;
