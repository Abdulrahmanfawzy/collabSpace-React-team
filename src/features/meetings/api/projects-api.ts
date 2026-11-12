
import api from "@/lib/api";

export const getProjects = async () => {
  const { data } = await api.get("/api/v1/projects");

  return data;
};
