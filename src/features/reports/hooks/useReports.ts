
import { useQuery } from "@tanstack/react-query";

import {
  getTasksReport,
  getProjectsReport,
  getTeamsReport,
  getUsersReport,
  getUserReport,
} from "../api/reportsApi";

export const useTasksReport = () => {
  return useQuery({
    queryKey: ["reports", "tasks"],
    queryFn: getTasksReport,
  });
};

export const useProjectsReport = () => {
  return useQuery({
    queryKey: ["reports", "projects"],
    queryFn: getProjectsReport,
  });
};

export const useTeamsReport = () => {
  return useQuery({
    queryKey: ["reports", "teams"],
    queryFn: getTeamsReport,
  });
};

export const useUsersReport = () => {
  return useQuery({
    queryKey: ["reports", "users"],
    queryFn: getUsersReport,
  });
};

export const useUserReport = (userId: number) => {
  return useQuery({
    queryKey: ["reports", "users", userId],
    queryFn: () => getUserReport(userId),
    enabled: !!userId,
  });
};
