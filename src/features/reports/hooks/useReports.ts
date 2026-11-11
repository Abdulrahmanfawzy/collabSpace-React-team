
import { useQuery } from "@tanstack/react-query";

import {
  getTasksReport,
  getProjectsReport,
  getTeamsReport,
  getUsersReport,
  getUserReport,
} from "../api/reportsApi";

export const useTasksReport = (enabled = true) => {
  return useQuery({
    queryKey: ["reports", "tasks"],
    queryFn: getTasksReport,
    enabled,
  });
};

export const useProjectsReport = (enabled = true) => {
  return useQuery({
    queryKey: ["reports", "projects"],
    queryFn: getProjectsReport,
    enabled,
  });
};

export const useTeamsReport = (enabled = true) => {
  return useQuery({
    queryKey: ["reports", "teams"],
    queryFn: getTeamsReport,
    enabled,
  });
};

export const useUsersReport = (enabled = true) => {
  return useQuery({
    queryKey: ["reports", "users"],
    queryFn: getUsersReport,
    enabled,
  });
};

export const useUserReport = (userId: number) => {
  return useQuery({
    queryKey: ["reports", "users", userId],
    queryFn: () => getUserReport(userId),
    enabled: !!userId,
  });
};
