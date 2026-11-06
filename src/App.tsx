<<<<<<< HEAD
import Dashboard from "../src/app/router/pages/Dashboard"
const App = () => {
  return <div className="text-center">
    <Dashboard/>
  </div>;
};

export default App;
=======

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProjectsPage from "./app/router/pages/projects-page";
import ProjectDetailsPage from "./app/router/pages/project-details-page";
import TasksPage from "./app/router/pages/tasks-page";
import MainLayout from "./components/layout/MainLayout";
import ReportsPage from "./features/reports/ReportsPage";


const App = () => {
  return<>
  <BrowserRouter>
  <Routes>
          <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/reports" element={<ReportsPage />} />

        <Route path="/projects" element={<ProjectsPage />} />

        <Route
          path="/projects/:projectId"
          element={<ProjectDetailsPage />}
        />

        <Route path="/tasks" element={<TasksPage />} />
          
          </Route>
  </Routes>
  
  
  </BrowserRouter>
 
  </> 
};

export default App;

>>>>>>> fac8ab8cb4d4a9ebb670fa2c2ee7016ac8e7f11b
