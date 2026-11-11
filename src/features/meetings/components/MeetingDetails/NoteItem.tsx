
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type Note = {
  id: number;
  content: string;
};

type NoteItemProps = {
  note: Note;
  isEditing: boolean;
  editContent: string;
  isUpdating: boolean;
  isDeleting: boolean;
  onStartEdit: (note: Note) => void;
  onEditContentChange: (value: string) => void;
  onUpdate: (id: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
};

const NoteItem = ({
  note,
  isEditing,
  editContent,
  isUpdating,
  isDeleting,
  onStartEdit,
  onEditContentChange,
  onUpdate,
  onCancel,
  onDelete,
}: NoteItemProps) => {
  return (
    <div className="p-3 rounded-xl bg-white border border-border flex justify-between items-start gap-3">
      {isEditing ? (
        <div className="flex-1 flex flex-col gap-2">
          <textarea
            value={editContent}
            onChange={(e) => onEditContentChange(e.target.value)}
            className="w-full p-2 rounded-lg border border-border text-small resize-none"
            rows={3}
          />

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onUpdate(note.id)}
              disabled={isUpdating}
            >
              Save
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-small flex-1 whitespace-pre-wrap">
            {note.content}
          </p>

          <div className="flex gap-2">
            
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              aria-label="Edit meeting"
              onClick={() => onStartEdit(note)}
              disabled={isUpdating}
            >
              <Pencil className="size-3.5" />
            </Button>

            
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              aria-label="Edit meeting"
              onClick={() => onDelete(note.id)}
              disabled={isDeleting}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem;
