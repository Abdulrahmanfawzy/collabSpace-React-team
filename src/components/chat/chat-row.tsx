import type { Person, Project } from "@/types/chat";

export function Avatar({
  src,
  color,
  size = "h-10 w-10",
}: {
  src?: string;
  color?: string;
  size?: string;
}) {
  return src ? (
    <img src={src} alt="" className={`${size} shrink-0 rounded-full object-cover`} />
  ) : (
    <span
      className={`${size} inline-block shrink-0 rounded-full`}
      style={{ backgroundColor: color ?? "#0f766e" }}
    />
  );
}

const row =
  "w-full rounded-lg px-2 py-3 text-left hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600";

export function PersonRow({
  person,
  active,
  onSelect,
}: {
  person: Person;
  active?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${row} flex items-center gap-3 ${active ? "bg-gray-100" : ""}`}
    >
      <Avatar src={person.avatar} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[15px] font-medium">{person.name}</span>
          <span className="shrink-0 text-[9px] text-gray-400">{person.time}</span>
        </div>
        <p className="mt-1 truncate text-[9px] text-gray-500">{person.lastMessage}</p>
      </div>
    </button>
  );
}

export function ProjectRow({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  return (
    <button type="button" onClick={onSelect} className={row}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[15px] font-medium">{project.project}</span>
        <span className="shrink-0 text-[9px] text-gray-400">{project.time}</span>
      </div>
      <p className="mt-1 text-xs font-medium">{project.channel}</p>
      <div className="mt-1 flex items-center gap-1.5">
        <Avatar src={project.avatar} color={project.color} size="h-3 w-3" />
        <span className="truncate text-[9px] text-gray-500">{project.lastMessage}</span>
      </div>
    </button>
  );
}


export function OpenProjectRow({
  project,
  channels,
  activeChannel,
  onChannel,
  onClose,
}: {
  project: Project;
  channels: string[];
  activeChannel?: string;
  onChannel: (c: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="rounded-lg bg-gray-100/70 p-3">
      <button
        type="button"
        onClick={onClose}
        className="w-full text-left text-[15px] font-medium"
      >
        {project.project}
      </button>
      <ul className="mt-2 space-y-2">
        {channels.map((name) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => onChannel(name)}
              className={`w-full rounded-md px-1 py-1 text-left ${
                name === activeChannel ? "bg-white shadow-sm" : ""
              }`}
            >
              <div className="flex justify-between">
                <span className="text-xs font-medium">{name}</span>
                <span className="text-[9px] text-gray-400">{project.time}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <Avatar src={project.avatar} color={project.color} size="h-3 w-3" />
                <span className="truncate text-[9px] text-gray-500">
                  {project.lastMessage}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}