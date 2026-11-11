import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Person, Project, RecentItem } from "@/types/chat";
import { OpenProjectRow, PersonRow, ProjectRow } from "./chat-row";

type Props = {
  mode: "home" | "inbox" | "projects";
  persons: Person[];
  projects: Project[];
  recent: RecentItem[];
  channels: string[];
  activeId?: string;
  activeChannel?: string;
  onChannelChange?: (c: string) => void;
};

const byPerson = (p: Person, q: string) => !q || p.name.toLowerCase().includes(q);
const byProject = (c: Project, q: string) =>
  !q || c.project.toLowerCase().includes(q) || c.channel.toLowerCase().includes(q);

export default function ChatSidebar({
  mode,
  persons: allPersons,
  projects: allProjects,
  recent: allRecent,
  channels,
  activeId,
  activeChannel,
  onChannelChange,
}: Props) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const persons = useMemo(() => allPersons.filter((p) => byPerson(p, q)), [allPersons, q]);
  const projects = useMemo(() => allProjects.filter((c) => byProject(c, q)), [allProjects, q]);
  const recent = useMemo(
    () =>
      allRecent.filter((r) =>
        r.kind === "person" ? byPerson(r.data, q) : byProject(r.data, q)
      ),
    [allRecent, q]
  );

  const openPerson = (id: number) => navigate(`/chats/inbox/${id}`);
  const openProject = (id: number) => navigate(`/chats/projects/${id}`);

  const count =
    mode === "home" ? recent.length : mode === "inbox" ? persons.length : projects.length;

  return (
    <aside className="flex w-[300px] shrink-0 flex-col rounded-xl bg-white px-4 pt-4">
      <div className="flex items-center justify-between">
        <Link to="/chats" className="text-[28px] font-semibold tracking-tight">
          Chats
        </Link>
        <button
          type="button"
          aria-label="Search chats"
          aria-expanded={searchOpen}
          onClick={() => {
            setSearchOpen((o) => !o);
            setQuery("");
          }}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
        >
          <SearchIcon />
        </button>
      </div>

      {searchOpen && (
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chats"
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-teal-600"
        />
      )}

      {mode === "home" ? (
        <>
          <nav className="mt-4 space-y-3 text-[17px] font-semibold">
            <Link to="/chats/inbox" className="block">Inbox</Link>
            <Link to="/chats/projects" className="block">Project Chats</Link>
          </nav>
          <h2 className="mt-6 text-[22px] font-semibold">Recent</h2>
        </>
      ) : (
        <div className="mt-3 rounded-lg bg-gray-100/70 px-2 py-2 text-[15px] font-semibold text-gray-800">
          {mode === "inbox" ? "Inbox" : "Project Chats"}
        </div>
      )}

      <ul className="mt-2 flex-1 space-y-1 overflow-y-auto pb-4">
        {mode === "home" &&
          recent.map((r) => (
            <li key={`${r.kind}-${r.data.id}`}>
              {r.kind === "person" ? (
                <PersonRow person={r.data} onSelect={() => openPerson(r.data.id)} />
              ) : (
                <ProjectRow project={r.data} onSelect={() => openProject(r.data.id)} />
              )}
            </li>
          ))}

        {mode === "inbox" &&
          persons.map((p) => (
            <li key={p.id}>
              <PersonRow
                person={p}
                active={String(p.id) === activeId}
                onSelect={() => openPerson(p.id)}
              />
            </li>
          ))}

        {mode === "projects" &&
          projects.map((c) => (
            <li key={c.id}>
              {String(c.id) === activeId ? (
                <OpenProjectRow
                  project={c}
                  channels={channels}
                  activeChannel={activeChannel}
                  onChannel={(ch) => onChannelChange?.(ch)}
                  onClose={() => navigate("/chats/projects")}
                />
              ) : (
                <ProjectRow project={c} onSelect={() => openProject(c.id)} />
              )}
            </li>
          ))}

        {count === 0 && (
          <li className="px-2 py-6 text-center text-sm text-gray-500">No chats found</li>
        )}
      </ul>
    </aside>
  );
}