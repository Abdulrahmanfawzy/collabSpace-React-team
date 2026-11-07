import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/features/tasks/components/kanban-board";
import { tasksMock } from "@/features/tasks/data/tasks.mock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Plus } from "lucide-react";
import { CreateTaskDialog } from "@/features/tasks/components/create-task-dialog";

const projectOptions = [
  { value: "1", label: "Alpha" },
  { value: "2", label: "SepetGo" },
];
export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [scope, setScope] = useState("mine");

  const filteredTasks = tasksMock.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesProject =
      projectFilter === "all" || task.projectId === Number(projectFilter);
    return matchesSearch && matchesProject;
  });

  return (
    <>
      <div className="p-6">
        <div className="flex  justify-between ">
          <div className="flex">
            <SearchInput value={search} onChange={setSearch} />

            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-36 rounded-full border-secondary-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectOptions.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={scope} onValueChange={setScope}>
              <SelectTrigger className="w-32 rounded-full border-secondary-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mine">My Task</SelectItem>
                <SelectItem value="all">All Tasks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            {/* <Button className="bg-primary-blue-500 hover:bg-primary-blue-600 rounded-2xl">
              Create Task <Plus size={14} />
            </Button> */}
            <CreateTaskDialog/>
          </div>
        </div>
      </div>
      <KanbanBoard tasks={filteredTasks} />
    </>
  );
}
