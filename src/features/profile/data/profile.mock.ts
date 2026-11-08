import avtar from "@/assets/images/profile-avtar.svg";

export interface Activity {
  id: number;
  text: string;
  time: string;
}

export interface Task {
  id: number;
  name: string;
  progress: number;
}

export interface FileItem {
  id: number;
  title: string;
  author: string;
  size: string;
  time: string;
  fileUrl?: string;
}

export const profileMockData = {
  name: "Mohamed Salah",
  role: "UI/UX Designer",
  joinedDate: "Joind Apr 2022",
  avatar: avtar,
  completedTasks: 140,
  hoursWorked: 345,
  about:
    `Experienced UI/UX Designer with over 5 years of experience in creating user-centered digital experiences.
     Passionate about design systems, accessibility, and leading creative teams to deliver exceptional products.
     Strong background in user research, wireframing, prototyping, and front-end development.`,
  recentActivities: [
    { id: 1, text: "Completed task User Research Analysis", time: "1h ago" },
    { id: 2, text: "Updated Design System Updates", time: "4h ago" },
    { id: 3, text: "Joined meeting Sprint Planning Meeting", time: "1d ago" },
    { id: 4, text: "Commented on Dashboard Layout Design", time: "2d ago" },
  ] as Activity[],
  todoTasks: [
    { id: 1, name: "Create user interview", progress: 40 },
    { id: 2, name: "Creat Wireframes", progress: 20 },
    { id: 3, name: "Create user flow", progress: 15 },
    { id: 4, name: "Design log in screen", progress: 30 },
  ] as Task[],
  doneTasks: [
    { id: 1, name: "Update design system", progress: 100 },
    { id: 2, name: "Create information architected", progress: 100 },
    { id: 3, name: "Make survey", progress: 100 },
    { id: 4, name: "Creat Wireframes", progress: 100 },
    { id: 5, name: "Creat Wireframes", progress: 100 },
    { id: 6, name: "Creat Wireframes", progress: 100 },
  ] as Task[],
  files: Array.from({ length: 9 }).map((_, index) => ({
    id: index + 1,
    title: "Design mockups",
    author: "By Ahmed Hassan",
    size: "6.4 MB",
    time: "1h ago",
    fileUrl: "",
  })) as FileItem[],
};

