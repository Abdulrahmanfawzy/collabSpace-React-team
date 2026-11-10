import api from "@/lib/api";

export interface ProfileUser {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  about: string | null;
  years_of_experience: number;
  phone: string | null;
  avatar_url: string | null;
  status: string;
  roles: string[];
  permissions: string[];
  google_linked: boolean;
  facebook_linked: boolean;
  linkedin_linked: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileStats {
  completed_tasks: number;
  total_tasks: number;
  hours_worked: number;
}

export interface ProfileActivity {
  id: number;
  category: string;
  action: string;
  description: string;
  created_at: string;
}

export interface ProfileProject {
  id: number;
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  priority: string;
  status: string;
  progress_percentage: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  pivot?: {
    user_id: number;
    project_id: number;
    role: string;
    created_at: string;
    updated_at: string;
  };
}

export interface ProfileMeResponse {
  success: boolean;
  message: string;
  data: {
    user: ProfileUser;
    stats: ProfileStats;
    recent_activities: ProfileActivity[];
    teams: unknown[];
    projects: ProfileProject[];
  };
}

export async function getProfile(): Promise<ProfileMeResponse> {
  const response = await api.get<ProfileMeResponse>("/api/v1/auth/me");
  return response.data;
}

export async function updateProfile(formData: FormData): Promise<AuthLikeResponse> {
  const response = await api.post("/api/v1/auth/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteAvatar(): Promise<AuthLikeResponse> {
  const response = await api.delete("/api/v1/auth/profile/avatar");
  return response.data;
}

export async function changePassword(payload: {
  current_password: string;
  password: string;
  password_confirmation: string;
}): Promise<AuthLikeResponse> {
  const response = await api.put("/api/v1/auth/password", payload);
  return response.data;
}

export async function getProfileTasks(page = 1): Promise<unknown> {
  const response = await api.get("/api/v1/auth/profile/tasks", {
    params: { page },
  });
  return response.data;
}

export async function getProfileFiles(page = 1): Promise<unknown> {
  const response = await api.get("/api/v1/auth/profile/files", {
    params: { page },
  });
  return response.data;
}

interface AuthLikeResponse {
  success: boolean;
  message: string;
  data?: unknown;
}