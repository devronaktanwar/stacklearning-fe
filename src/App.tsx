import Navbar from './components/Navbar'
import { JobFilterProvider } from './context/JobFilterContext'
import JobBoardPage from './pages/JobBoardPage'
const App = () => {
  return (
    <JobFilterProvider>
    <div>
      <Navbar/>
      <JobBoardPage/>
    </div>
    </JobFilterProvider>
  )
}

export default App