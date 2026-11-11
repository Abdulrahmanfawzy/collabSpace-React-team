import { useState } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import ChatSidebar from "../chat/chat-sidebar";
import type { Person, Project, RecentItem } from "@/types/chat";

//person 
const PERSONS: Person[] = [
  { id: 1, name: "Mohamed Ahmed", role: "Senior UI/UX",       avatar: "https://i.pravatar.cc/80?img=12", lastMessage: "Yes, we can do this and e..",    time: "5:22 pm" },
  { id: 2, name: "Salah Ali",     role: "Frontend Developer", avatar: "https://i.pravatar.cc/80?img=15", lastMessage: "Please try and do this and e..", time: "7:22 pm" },
  { id: 3, name: "Ramzy Khaled",  role: "Backend Developer",  avatar: "https://i.pravatar.cc/80?img=33", lastMessage: "I don't know and e..",           time: "5:22 pm" },
  { id: 4, name: "Sohaib Rady",   role: "Project Manager",    avatar: "https://i.pravatar.cc/80?img=52", lastMessage: "Please call me later fo..",      time: "5:22 pm" },
  { id: 5, name: "Mohamed Ahmed", role: "Senior UI/UX",       avatar: "https://i.pravatar.cc/80?img=60", lastMessage: "Yes, we can do this and e..",    time: "5:22 pm" },
  { id: 6, name: "Sohaib Rady",   role: "Project Manager",    avatar: "https://i.pravatar.cc/80?img=68", lastMessage: "Please call me later fo..",      time: "5:22 pm" },
];
//project 
const PROJECTS: Project[] = [
  { id: 1, project: "UI Dashboard Project",   channel: "Public Channel",         lastMessage: "We need to improve performance", time: "8:22 am", avatar: "https://i.pravatar.cc/40?img=12", color: "#0f766e" },
  { id: 2, project: "Pet website Project",    channel: "Frontend Team Channel",  lastMessage: "We need to improve performance", time: "8:22 am", avatar: "https://i.pravatar.cc/40?img=15", color: "#2563eb" },
  { id: 3, project: "SAAS UI/UX Project",     channel: "Backend Team Channel",   lastMessage: "We need to improve performance", time: "8:22 am", avatar: "https://i.pravatar.cc/40?img=33", color: "#7c3aed" },
  { id: 4, project: "Food delivery Project",  channel: "UI/UX Team Channel",     lastMessage: "We need to improve performance", time: "8:22 am", avatar: "https://i.pravatar.cc/40?img=52", color: "#ea580c" },
  { id: 5, project: "Hotels booking Project", channel: "Marketing Team Channel", lastMessage: "We need to improve performance", time: "8:22 am", avatar: "https://i.pravatar.cc/40?img=60", color: "#db2777" },
  { id: 6, project: "Events website Project", channel: "Public Channel",         lastMessage: "We need to improve performance", time: "1:12 pm", avatar: "https://i.pravatar.cc/40?img=68", color: "#0891b2" },
];
//channel 
const CHANNELS = [
  "Public Channel",
  "Frontend Team Channel",
  "Backend Team Channel",
  "UI/UX Team Channel",
];

const RECENT: RecentItem[] = [
  { kind: "project", data: PROJECTS[1] },
  { kind: "project", data: PROJECTS[0] },
  { kind: "person", data: PERSONS[0] },
  { kind: "person", data: PERSONS[1] },
  { kind: "person", data: PERSONS[2] },
];
// ---------------------------------------------------------------------------

export type ChatsOutletContext = {
  channel: string;
  persons: Person[];
  projects: Project[];
};

export default function ChatsLayout() {
  const { pathname } = useLocation();
  const [channel, setChannel] = useState(CHANNELS[0]);

  const persons = PERSONS;
  const projects = PROJECTS;
  const channels = CHANNELS;
  const recent = RECENT;

  const person = useMatch("/chats/inbox/:id");
  const project = useMatch("/chats/projects/:id");

  const mode = pathname.startsWith("/chats/inbox")
    ? "inbox"
    : pathname.startsWith("/chats/projects")
    ? "projects"
    : "home";

  return (
    
    <div className="flex h-[calc(100vh-64px)] w-full gap-2 bg-[#f6f6f7] p-2 font-sans text-gray-900">
      <ChatSidebar
        mode={mode}
        persons={persons}
        projects={projects}
        recent={recent}
        channels={channels}
        activeId={person?.params.id ?? project?.params.id}
        activeChannel={channel}
        onChannelChange={setChannel}
      />
      <Outlet context={{ channel, persons, projects } satisfies ChatsOutletContext} />
    </div>
  );
}