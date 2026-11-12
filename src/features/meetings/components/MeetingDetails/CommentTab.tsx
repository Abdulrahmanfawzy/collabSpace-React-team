import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useGetMeetingComments,
  useCreateMeetingComment,
  useUpdateMeetingComment,
  useDeleteMeetingComment,
} from "../../hooks/useMeetingComments";
import { Pencil, Trash2 } from "lucide-react";
import { getStoredUser } from "@/lib/auth";
import { type UserRole } from "@/features/auth/constants/permissions";
import { toast } from "sonner";

type CommentsTabProps = {
  meetingId: number;
};

const CommentsTab = ({ meetingId }: CommentsTabProps) => {

  const { data, isLoading } = useGetMeetingComments(meetingId);

  const { mutate: createComment, isPending: isCreating } = useCreateMeetingComment(meetingId);
  const { mutate: updateComment, isPending: isUpdating } =  useUpdateMeetingComment(meetingId);
  const { mutate: deleteComment, isPending: isDeleting } =  useDeleteMeetingComment(meetingId);

  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editBody, setEditBody] = useState("");

  const comments = data?.data?.data ?? [];

  const currentUser = getStoredUser() as {
    id: number;
    roles?: UserRole[];
  } | null;

  const role = currentUser?.roles?.[0];

  const isAdminOrPM =  role === "Administrator" || role === "Project Manager";


  const canModifyComment = (comment: { author?: { id?: number } }) => {
    if (isAdminOrPM) return true;

    return currentUser?.id === comment.author?.id;
  };

const handleCreate = () => {
  if (!body.trim()) return;

  createComment(
    { body },
    {
      onSuccess: (response) => {
        setBody("");
        toast.success(response.message || "Comment added successfully");
      },
      onError: () => {
        toast.error("Failed to add comment");
      },
    }
  );
};

const handleStartEdit = (comment: { id: number; body: string }) => {
  setEditingId(comment.id);
  setEditBody(comment.body);
};

const handleUpdate = (commentId: number) => {
  if (!editBody.trim()) return;

  updateComment(
    {
      commentId,
      payload: { body: editBody },
    },
    {
      onSuccess: (response) => {
        setEditingId(null);
        setEditBody("");
        toast.success(response.message || "Comment updated successfully");
      },
      onError: () => {
        toast.error("Failed to update comment");
      },
    }
  );
};

  const handleDelete = (commentId: number) => {
    deleteComment(commentId, {
      onSuccess: (response) => {
        toast.success(response.message || "Comment deleted successfully");
      },
      onError: () => {
        toast.error("Failed to deleted comment");
      },
    });
  };

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-background rounded-xl" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Add Comment */}
      <div className="flex gap-2 items-center">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-3 rounded-xl border border-border bg-white text-small"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCreate();
            }
          }}
        />
        <Button
          size="sm"
          onClick={handleCreate}
          disabled={isCreating || !body.trim()}
        >
          {isCreating ? "Adding..." : "Add"}
        </Button>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-3">
        
        {comments.length === 0 &&  <p className="text-muted-foreground text-small">No comments yet.</p> }

        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="p-3 rounded-xl bg-white border border-border flex justify-between items-start gap-3"
          >
            {editingId === comment.id ? (
              <div className="flex-1 flex flex-col gap-2">
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border text-small resize-none"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdate(comment.id)}
                    disabled={isUpdating}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setEditBody("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <p className="text-small whitespace-pre-wrap">{comment.body}</p>
                  {comment.author?.name && (
                    <span className="text-caption-small text-muted-foreground mt-1 block">
                      {comment.author.name || "Unknown"}
                    </span>
                  )}
                </div>

                {canModifyComment(comment) && (
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      aria-label="Edit comment"
                      onClick={() => handleStartEdit(comment)}
                    >
                      <Pencil className="size-3.5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 text-destructive"
                      aria-label="Delete comment"
                      onClick={() => handleDelete(comment.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsTab;