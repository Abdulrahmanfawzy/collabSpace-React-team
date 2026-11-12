import { apiClient } from "@/lib/api-client";

export async function getUsers() {
  const { data } = await apiClient.get("/users", {
    params: { per_page: 15 },
  });

  return data;
}