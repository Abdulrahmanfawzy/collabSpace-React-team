import { Button } from '@/components/ui/button';
import avetar from '../../../../assets/images/profile-avtar.svg';
import { useState } from "react";
import { Pencil, Trash2 } from 'lucide-react';
type TranscriptCardProps = {
  id: number;
  name: string;
  text: string;
  meetingId: number;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (id: number, newText: string) => void;
  onDelete?: (id: number) => void;
  createdAt : string
};

const TranscriptCard = ({
  id,
  name,
  text,
  canEdit = true,
  canDelete = true,
  onEdit,
  onDelete,
  createdAt
}: TranscriptCardProps) => {
    
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (onEdit && editText.trim()) {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">

      <div className="flex items-center justify-between">

        <div className='flex items-center gap-1'>
            <span className='text-caption-small rounded-pill border border-black p-2 '>
                {new Date(createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })}
            </span>
            <div className="flex items-center gap-2">
            <img
                src={avetar}
                alt="user image"
                className="w-8 h-8 rounded-full border-2"
            />
            <span className="text-caption-small font-normal">{name}</span>
            </div>
        </div>

        {(canEdit || canDelete) && (
          <div className="flex gap-2">
            {canEdit && (

            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              aria-label="Edit meeting"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="size-3.5" />
            </Button>

            )}
            {canDelete && (

            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              aria-label="Edit meeting"
              onClick={() => onDelete?.(id)}
            >
              <Trash2 className="size-3.5" />
            </Button>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-3 rounded-xl border border-border text-small resize-none"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="text-sm font-medium text-primary"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(text);
              }}
              className="text-sm text-muted-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-small font-normal">{text}</p>
      )}
    </div>
  );
};
export default TranscriptCard;