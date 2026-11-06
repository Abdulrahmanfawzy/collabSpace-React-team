
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


