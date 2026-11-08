import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./components/layout/MainLayout";
import ProjectsPage from "./app/router/pages/projects-page";
import ProjectDetailsPage from "./app/router/pages/project-details-page";
import TasksPage from "./app/router/pages/tasks-page";
import ReportsPage from "./features/reports/ReportsPage";

import Login from "./app/router/pages/login";
import Resgister from "./app/router/pages/register";
import ForgotPasswordPage from "./app/router/pages/forgot-password";


import ChatsLayout from "./components/layout/chats-layout";
import ProjectChatPage from "./app/router/pages/projectChat-page";
import SelectChat from "./app/router/pages/select-chat";
import PersonChatPage from "./app/router/pages/chat-page";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Resgister />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* 3. صفحات التطبيق الداخلية (الخاصة بالتيم مع الـ MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailsPage />}
          />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/reports" element={<ReportsPage />} />
         <Route path="/chats" element={<ChatsLayout />}>
  <Route index element={<SelectChat />} />
  <Route path="inbox" element={<SelectChat />} />
  <Route path="inbox/:personId" element={<PersonChatPage />} />
  <Route path="projects" element={<SelectChat />} />
  <Route path="projects/:projectId" element={<ProjectChatPage />} />
</Route>
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;