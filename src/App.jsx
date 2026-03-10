import Resume from './pages/Resume';
import StocksDashboard from './pages/StocksDashboard'
import './master.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/stocks" element={<StocksDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
