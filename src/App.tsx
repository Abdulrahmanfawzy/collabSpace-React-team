import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import ReportsPage from "./features/reports/ReportsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/reports" element={<ReportsPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;