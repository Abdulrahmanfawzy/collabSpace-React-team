
import { useEffect, useState } from "react"
import { UserRoundPlus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useTeams } from "../hooks/use-teams"
import { useAssignTask } from "../hooks/use-assign-task"
import type { TaskDetailsItem } from "../types/tasks.types.api"

interface AssignTaskDialogProps {
  task: TaskDetailsItem
}

export function AssignTaskDialog({ task }: AssignTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [teamId, setTeamId] = useState(
    task.team_id ? String(task.team_id) : ""
  )
  const [memberId, setMemberId] = useState(
    task.assigned_to ? String(task.assigned_to) : ""
  )

  const {
    data: teams,
    isLoading: isLoadingTeams,
    isError: isTeamsError,
  } = useTeams({ page: 1, per_page: 15 })

  const { mutate: assignTask, isPending } = useAssignTask()

  const selectedTeam = teams?.find(
    (team) => String(team.id) === teamId
  )

  const members = selectedTeam?.members ?? []

  useEffect(() => {
    if (open) {
      setTeamId(task.team_id ? String(task.team_id) : "")
      setMemberId(task.assigned_to ? String(task.assigned_to) : "")
    }
  }, [open, task])

  function handleTeamChange(value: string) {
    setTeamId(value)
    setMemberId("")
  }

  function handleSubmit() {
    if (!teamId || !memberId) {
      toast.error("Please select a team and a member")
      return
    }

    assignTask(
      {
        taskId: task.id,
        payload: {
          assigned_to: Number(memberId),
          team_id: Number(teamId),
        },
      },
      {
        onSuccess: function () {
          toast.success("Task assigned successfully")
          setOpen(false)
        },
        onError: function () {
          toast.error("Failed to assign task")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        className="rounded-xl"
        onClick={() => setOpen(true)}
      >
        <UserRoundPlus size={16} />
        Assign Task
      </Button>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Team</label>

            <Select
              value={teamId}
              onValueChange={handleTeamChange}
              disabled={isLoadingTeams || isTeamsError}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingTeams ? "Loading teams..." : "Select team"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {teams?.map((team) => (
                  <SelectItem key={team.id} value={String(team.id)}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isTeamsError && (
              <p className="text-xs text-destructive">
                Failed to load teams.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Team Member</label>

            <Select
              value={memberId}
              onValueChange={setMemberId}
              disabled={!teamId || members.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    !teamId
                      ? "Select a team first"
                      : members.length === 0
                        ? "No members found"
                        : "Select member"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {members.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={String(member.id)}
                  >
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTeam && (
            <p className="text-xs text-secondary-gray-400">
              {selectedTeam.members_count} members in {selectedTeam.name}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!teamId || !memberId || isPending}
            className="rounded-xl bg-primary-blue-500 hover:bg-primary-blue-600"
          >
            {isPending ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
