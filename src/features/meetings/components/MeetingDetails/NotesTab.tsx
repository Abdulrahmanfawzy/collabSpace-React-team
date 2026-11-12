import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useGetMeetingNotes,
  useCreateMeetingNote,
  useUpdateMeetingNote,
  useDeleteMeetingNote,
} from "../../hooks/useMeetingNotes";
import NoteItem from "./NoteItem";
import { toast } from "sonner";

type NotesTabProps = {
  meetingId: number;
};

const NotesTab = ({ meetingId }: NotesTabProps) => {
  const { data, isLoading } = useGetMeetingNotes(meetingId);
  const { mutate: createNote, isPending: isCreating } = useCreateMeetingNote(meetingId);
  const { mutate: updateNote, isPending: isUpdating } = useUpdateMeetingNote(meetingId);
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteMeetingNote(meetingId);

  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const notes = data?.data || [];

  const handleCreate = () => {
    if (!content.trim()) return;
    createNote(
      { content },
      {
        onSuccess: (response) => {
          setContent("")
          toast.success(response.message || "Note Created successfully");
        },
        onError: () => {
          toast.error("Failed to create note");
        },

      }
    );
  };

  const handleStartEdit = (note: { id: number; content: string }) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleUpdate = (noteId: number) => {
    if (!editContent.trim()) return;
    updateNote(
      { noteId, payload: { content: editContent } },
      {
        onSuccess: (response) => {
          setEditingId(null);
          setEditContent("");
          toast.success(response.message || "Note Updated successfully");
        },
        onError: () => {
          toast.error("Failed to update note");
        }
        
      }
    );
  };

  const handleDelete = (noteId: number) => {
    deleteNote(noteId , {
        onSuccess: (response) => {
          toast.success(response.message || "Note Deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete note");
        }
    });
  };

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-background rounded-xl" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Add Note */}
      <div className="flex gap-2 items-center">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a note..."
          className="flex-1 p-3 rounded-xl border border-border bg-white text-small"
        />
        <Button
          size="sm"
          onClick={handleCreate}
          disabled={isCreating || !content.trim()}
        >
          {isCreating ? "Adding..." : "Add"}
        </Button>
      </div>

      {/* Notes List */}
      <div className="flex flex-col gap-3">
        {notes.length === 0 && (
          <p className="text-muted-foreground text-small">No notes yet.</p>
        )}

       
        {notes.map((note) => (
            <NoteItem
                key={note.id}
                note={note}
                isEditing={editingId === note.id}
                editContent={editContent}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
                onStartEdit={handleStartEdit}
                onEditContentChange={setEditContent}
                onUpdate={handleUpdate}
                onCancel={() => setEditingId(null)}
                onDelete={handleDelete}
            />
        ))}

      </div>
    </div>
  );
};

export default NotesTab;