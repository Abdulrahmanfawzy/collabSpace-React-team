export type ProjectTeam = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  status: string;
  priority: string;
  progress_percentage: number;
  files_count: number;
  teams: ProjectTeam[];
  created_at: string;
};

export type ProjectsFilters = {
  page?: number;
  per_page?: number;
  sort?: "newest" | "oldest";
};

export type PaginationLink = {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
};

export type PaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type ProjectsResponse = {
  success: boolean;
  message: string;
  data: {
    data: Project[];
    links: PaginationLinks;
    meta: PaginationMeta;
  };
};