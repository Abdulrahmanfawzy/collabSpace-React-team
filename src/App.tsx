
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import ProjectsPage from "./app/router/pages/projects-page";
import ProjectDetailsPage from "./app/router/pages/project-details-page";
import TasksPage from "./app/router/pages/tasks-page";
import MainLayout from "./components/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/projects" replace />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectDetailsPage />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
      {
        path: "reports",
        element: <TasksPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
