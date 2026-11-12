import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/features/tasks/components/kanban-board";
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
import { useTasks } from "@/features/tasks/hooks/use-tasks";
import { EmptyState } from "@/components/common/empty-state";
import { ProjectsLoading } from "@/components/skeleton/loading";


const projectOptions = [
  { value: "1", label: "Alpha" },
  { value: "2", label: "SepetGo" },
];
export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [scope, setScope] = useState("mine");


  const user = JSON.parse(localStorage.getItem("user") || "null");
const userId = user?.id;
const {
  data,
  isLoading,
  isError,
} = useTasks({
  project_id:
    projectFilter === "all" ? undefined : Number(projectFilter),
  assigned_to: scope === "mine" ? userId : undefined,
});

const filteredTasks = (data?.tasks ?? []).filter((task) =>
  task.title.toLowerCase().includes(search.toLowerCase())
);



if (isLoading) return <ProjectsLoading />;

if (isError) return <p className="p-6 text-support-danger">Failed to load tasks</p>;

if (filteredTasks.length === 0) {
  return (
    <EmptyState
      title="No Tasks Yet"
      description="You don't have any tasks assigned to you yet. Once a task is assigned, it will appear here."
    />
  );
}
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
