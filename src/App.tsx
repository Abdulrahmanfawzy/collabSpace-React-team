import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Toaster } from "sonner";

import ProjectsPage from "./app/router/pages/projects-page";
import ProjectDetailsPage from "./app/router/pages/project-details-page";
import TasksPage from "./app/router/pages/tasks-page";
import ReportsPage from "./features/reports/ReportsPage";
import Login from "./app/router/pages/login";
import Resgister from "./app/router/pages/register";
import ForgotPasswordPage from "./app/router/pages/forgot-password";
import ProfilePage from "./app/router/pages/profile-page";
import ProfileSettingsPage from "./app/router/pages/profile-settings-page";
import MainLayout from "./components/layout/MainLayout";
import PersonChatPage from "./app/router/pages/chat-page";
import CalendaPage from "./app/router/pages/CalendarPage";
import MeetingDetailsPage from "./app/router/pages/MeetingDetailsPage";
import Dashboard from "./app/router/pages/dashboard-page";
import SelectChat from "./app/router/pages/select-chat";
import ChatsLayout from "./components/layout/chats-layout";
import ProjectChatPage from "./app/router/pages/projectChat-page";
import ProjectsChatsPage from "./app/router/pages/projects-chat-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Resgister />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/projects/:projectId",
        element: <ProjectDetailsPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/reports",
        element: <ReportsPage />,
      },
      {
        path: "/meetings",
        element: <CalendaPage />,
      },
      {
        path: "/meetings/:id",
        element: <MeetingDetailsPage />,
      },
    {
  path: "/chats",
  element: <ChatsLayout />,
  children: [
     { index: true, element: <SelectChat /> },
    { path: "inbox", element: <SelectChat /> },
    { path: "inbox/:id", element: <PersonChatPage /> },
    { path: "projects", element: <SelectChat /> },
    { path: "projects/:projectId", element: <ProjectChatPage /> },
           
    ]},
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/settings",
        element: <ProfileSettingsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
