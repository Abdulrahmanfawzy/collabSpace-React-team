import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./components/layout/MainLayout";
import ProjectsPage from "./app/router/pages/projects-page";
import ProjectDetailsPage from "./app/router/pages/project-details-page";
import TasksPage from "./app/router/pages/tasks-page";
import ReportsPage from "./features/reports/ReportsPage";
import Dashboard from "./app/router/pages/dashboard-page";

import Login from "./app/router/pages/login";
import Resgister from "./app/router/pages/register";
import ForgotPasswordPage from "./app/router/pages/forgot-password";

const App = () => {
<<<<<<< HEAD
  return<>
  <BrowserRouter>
  <Routes>
          <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/dashboard" element= {<Dashboard/>}/>
=======
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Resgister />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
>>>>>>> 5f62c057bd4cdf0d742a990849324d3b8dc581ab

        {/* 3. صفحات التطبيق الداخلية (الخاصة بالتيم مع الـ MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailsPage />}
          />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

<<<<<<< HEAD
export default App;


=======
export default App;
>>>>>>> 5f62c057bd4cdf0d742a990849324d3b8dc581ab
