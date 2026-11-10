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
import VerifyOtpPage from "./app/router/pages/verify-otp";
import ResetPasswordPage from "./app/router/pages/reset-password";
import ProfilePage from "./app/router/pages/profile-page";
import ProfileSettingsPage from "./app/router/pages/profile-settings-page";
import MainLayout from "./components/layout/MainLayout";
import { ProtectedRoute } from "./app/router/guards/ProtectedRoute";
import { isAuthenticated } from "./lib/auth";
import PersonChatPage from "./app/router/pages/chat-page";
import CalendaPage from "./app/router/pages/CalendarPage";
import MeetingDetailsPage from "./app/router/pages/MeetingDetailsPage";
import Dashboard from "./app/router/pages/dashboard-page";

function RootRedirect() {
  return <Navigate to={isAuthenticated() ? "/dashboard" : "/sign-in"} replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
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
    path: "/verify-otp",
    element: <VerifyOtpPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
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
        element: <PersonChatPage />,
      },
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
