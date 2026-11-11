
import { axiosInstance } from "@/lib/axios";

import type {
  ApiResponse,
  TasksReport,
  ProjectsReport,
  TeamsReport,
  UserReport,
} from "../types/reports.types";

export const getTasksReport = async () => {
  const response = await axiosInstance.get<ApiResponse<TasksReport>>(
    "/api/v1/reports/tasks"
  );

  return response.data.data;
};

export const getProjectsReport = async () => {
  const response = await axiosInstance.get<ApiResponse<ProjectsReport>>(
    "/api/v1/reports/projects"
  );

  return response.data.data;
};

export const getTeamsReport = async () => {
  const response = await axiosInstance.get<ApiResponse<TeamsReport>>(
    "/api/v1/reports/teams"
  );

  return response.data.data;
};

export const getUsersReport = async () => {
  const response = await axiosInstance.get<ApiResponse<UserReport>>(
    "/api/v1/reports/users"
  );

  return response.data.data;
};

export const getUserReport = async (userId: number) => {
  const response = await axiosInstance.get<ApiResponse<UserReport>>(
    `/api/v1/reports/users/${userId}`
  );

  return response.data.data;
};
