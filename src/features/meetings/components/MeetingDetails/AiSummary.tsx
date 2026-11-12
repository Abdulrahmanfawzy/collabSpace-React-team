import { useGetMeetingDetails } from "../../hooks/useGetMeetingDetails";
import { useGenerateMeetingSummary } from "../../hooks/useGenerateMeetingSummary";
import { useCreateTasksFromSummary } from "../../hooks/useCreateTasksFromSummary";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NotesTab from "./NotesTab";
import CommentsTab from "./CommentTab";
import { getStoredUser } from "@/lib/auth";
import type { UserRole } from "@/features/auth/constants/permissions";
import { toast } from "sonner";

type Tab = "summary" | "note" | "comments";

type props = {
  id: string | undefined;
};

const AiSummary = ({ id }: props) => {
  const meetingId = Number(id);

  const { data, isLoading, isError } = useGetMeetingDetails(meetingId);
  const { mutate: generateSummary, isPending: isGenerating } =
    useGenerateMeetingSummary(meetingId);
  const { mutate: createTasks, isPending: isCreatingTasks } =
    useCreateTasksFromSummary(meetingId);

  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [transcript, setTranscript] = useState("");

  const summary = data?.data?.summary;

  // Permissions
  const currentUser = getStoredUser() as {
    id: number;
    roles?: UserRole[];
  } | null;

  const role = currentUser?.roles?.[0];
  const canGenerateSummary = role === "Administrator" || role === "Project Manager";

  const handleGenerate = () => {
    if (!transcript.trim()) {
      toast.error("Please enter a transcript first");
      return;
    }

    generateSummary(
      { transcript },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Summary generated successfully");
        },
        onError: () => {
          toast.error("Failed to generate summary");
        },
      },
    );
  };

  const handleCreateTasks = () => {
    createTasks(undefined, {
    onSuccess: (response) => {
      toast.success(response.message || "Tasks created successfully");
    },
    onError: () => {
      toast.error("Failed to create tasks");
    },
  });
  };

  if (isLoading) {
    return (
      <div className="w-188 h-95 animate-pulse bg-background-secondary rounded-4xl" />
    );
  }

  if (isError) {
    return <div className="text-destructive">Failed to load summary</div>;
  }

  return (
    <div className="w-188">

      {/* Tabs */}
      <div className="w-78 flex">
        <span
          onClick={() => setActiveTab("summary")}
          className={`cursor-pointer p-2.5 text-small font-normal rounded-t-lg transition duration-300 ${
            activeTab === "summary"
              ? "bg-background-secondary"
              : "bg-transparent hover:bg-background-secondary"
          }`}
        >
          Ai Summary
        </span>
        <span
          onClick={() => setActiveTab("note")}
          className={`cursor-pointer p-2.5 text-small font-normal rounded-t-lg transition duration-300 ${
            activeTab === "note"
              ? "bg-background-secondary"
              : "bg-transparent hover:bg-background-secondary"
          }`}
        >
          Note
        </span>
        <span
          onClick={() => setActiveTab("comments")}
          className={`cursor-pointer p-2.5 text-small font-normal rounded-t-lg transition duration-300 ${
            activeTab === "comments"
              ? "bg-background-secondary"
              : "bg-transparent hover:bg-background-secondary"
          }`}
        >
          Comments
        </span>
      </div>

      {/* Content */}
      <div className="w-full min-h-86 rounded-tr-4xl rounded-b-4xl pt-5 pb-4 px-4 flex flex-col gap-6 bg-background-secondary">
        {activeTab === "summary" && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-h5 leading-4">
                AI Generate Summary
              </h3>

              {canGenerateSummary && (
                <div className="flex gap-2">
                  {!summary && (
                    <Button
                      size="sm"
                      onClick={handleGenerate}
                      disabled={isGenerating || !transcript.trim()}
                    >
                      {isGenerating ? "Generating..." : "Generate"}
                    </Button>
                  )}

                  {summary && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCreateTasks}
                      disabled={isCreatingTasks}
                    >
                      {isCreatingTasks ? "Creating..." : "Create Tasks"}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Generate input - amdin and pr*/}
            {canGenerateSummary && !summary && (
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste meeting transcript here..."
                className="w-full h-28 p-3 rounded-xl border border-border bg-white text-small resize-none"
              />
            )}

            {/* Summary Content */}
            {summary && (
              <div className="w-full flex flex-col gap-6">
                <div>
                  <span className="font-medium text-h6">Summary</span>
                  <p className="mt-2 font-normal text-body leading-5">
                    {summary.summary}
                  </p>
                </div>

                {summary.decisions_made?.length > 0 && (
                  <div>
                    <span className="font-medium text-h6">Decisions Made</span>
                    <ul className="mt-3 flex flex-col gap-3 list-disc pl-5">
                      {summary.decisions_made.map((item, i) => (
                        <li key={i} className="font-normal text-body leading-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {summary.action_items?.length > 0 && (
                  <div>
                    <span className="font-medium text-h6">Action Items</span>
                    <ul className="mt-3 flex flex-col gap-3 list-disc pl-5">
                      {summary.action_items.map((item, i) => (
                        <li key={i} className="font-normal text-body leading-4">
                          {typeof item === "string"
                            ? item
                            : `${item.title}${
                                item.suggested_assignee
                                  ? ` → ${item.suggested_assignee}`
                                  : ""
                              }${item.priority ? ` (${item.priority})` : ""}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {summary.risks?.length > 0 && (
                  <div>
                    <span className="font-medium text-h6">Risks</span>
                    <ul className="mt-3 flex flex-col gap-3 list-disc pl-5">
                      {summary.risks.map((item, i) => (
                        <li key={i} className="font-normal text-body leading-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {summary.next_steps?.length > 0 && (
                  <div>
                    <span className="font-medium text-h6">Next Steps</span>
                    <ul className="mt-3 flex flex-col gap-3 list-disc pl-5">
                      {summary.next_steps.map((item, i) => (
                        <li key={i} className="font-normal text-body leading-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {!summary && canGenerateSummary && !transcript && (
              <p className="text-muted-foreground text-small">
                No summary yet. Paste a transcript and generate one.
              </p>
            )}

            {!summary && !canGenerateSummary && (
              <p className="text-muted-foreground text-small">
                No summary available yet.
              </p>
            )}
          </>
        )}

        {activeTab === "note" && <NotesTab meetingId={meetingId} />}

        {activeTab === "comments" && <CommentsTab meetingId={meetingId} />}
      </div>
    </div>
  );
};

export default AiSummary;