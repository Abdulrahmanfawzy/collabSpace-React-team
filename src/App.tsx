
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
import CalendaPage from "./app/router/pages/CalendaPage";
import MettingDetailsPage from "./app/router/pages/MettingDetailsPage";


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

        <Route path="/meetings" element={<CalendaPage />} />

        <Route path="/meetings/:id" element={<MettingDetailsPage />} />

        <Route path="/tasks" element={<TasksPage />} />
          
          </Route>
  </Routes>
  
  
  </BrowserRouter>
 
  </> 
};

export default App;

