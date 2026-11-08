import type { Task } from "../types/task.types";

const m = (id: number) => ({
  id,
  name: "Ali Hassan",
  avatar: `https://i.pravatar.cc/48?img=${id}`,
});

export const tasksMock: Task[] = [
  { id: 1, title: "Create Wireframes", description: "Initial layout and structure for main page", priority: "High", status: "todo", members: [m(1), m(2), m(3)], comments: 8, date: "Dec 12",projectId:1 },
  { id: 2, title: "User Research Analysis", description: "Initial layout and structure for main page", priority: "Medium", status: "todo", members: [m(1), m(2), m(3)], comments: 8, date: "Dec 12" ,projectId:1 },
  { id: 3, title: "Chat Screen Prototyping", description: "Create Interactive Prototype for Chat screen", priority: "High", status: "in-progress", progress: 62, members: [m(1), m(2), m(3)], comments: 8, date: "Dec 12",projectId:2  },
  { id: 4, title: "Mobile Responsive", description: "Create Interactive Prototype for Chat screen", priority: "High", status: "in-review", reviewer: m(4), members: [m(1), m(2), m(3)], comments: 8, date: "Dec 12",projectId:2  },
  { id: 5, title: "Login Screen", description: "Initial layout and structure for mani page", priority: "High", status: "completed", members: [m(1), m(2), m(3)], comments: 8, date: "Dec 12", },
];