
import api from "@/lib/api";

export interface User {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  avatar_url: string | null;
  status: "active" | "inactive";
}

interface UsersResponse {
  success: boolean;
  data: User[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const getUsers = async (): Promise<UsersResponse> => {
  const { data } = await api.get<UsersResponse>("/api/v1/users", {
    params: {
      per_page: 15,
    },
  });

  console.log(data)
  return data;
};
