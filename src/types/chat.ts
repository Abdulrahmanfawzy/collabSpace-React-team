export type Person = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
};

export type Project = {
  id: number;
  project: string;
  channel: string;
  lastMessage: string;
  time: string;
  avatar: string;
  color: string;
};

export type RecentItem =
  | { kind: "person"; data: Person }
  | { kind: "project"; data: Project };