import Resume from './pages/Resume';
import MyInvestments from './pages/MyInvestments'
import './master.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/stocks" element={<MyInvestments />} />
      </Routes>
    </Router>
  )
}

export default App
