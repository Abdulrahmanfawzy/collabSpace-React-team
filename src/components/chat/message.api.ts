import api  from "@/lib/api";

export interface ApiMessage {
  id: number;
  project_id: number;
  message: string;
  is_edited: boolean;
  sender: {
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    job_title: string;
  };
  parent: { id: number; message: string; sender_name: string } | null;
  attachment: {
    id: number;
    name: string;
    mime_type: string;
    file_size: number;
    url: string;
  } | null;
  mentions: { id: number; name: string; email: string }[];
  is_read_by_me: boolean;
  readers_count: number;
  created_at: string;
  updated_at: string;
}

export interface MessagesPage {
  data: ApiMessage[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

// message.api.ts
export async function getProjectMessages(projectId: number | string, perPage = 20) {
  try {
    const res = await api.get(`/projects/${projectId}/messages`, {
      params: { per_page: perPage},
    });
    return res.data.data as MessagesPage;
  } catch (err: any) {
    console.log(`/projects/${projectId}/messages`);
    console.log("status:", err.response?.status);
    console.log("body:", err.response?.data);
    console.log("auth header sent:", err.config?.headers?.Authorization ? "yes" : "NO");
    throw err;
  }
}