/* eslint-disable react-hooks/exhaustive-deps */
import TranscriptsHeader from "./TranscriptsHeader";
import TranscriptCard from "./TranscriptCard";
import SearchInput from "../../../../components/common/SearchInput";
import {
  useGetMeetingComments,
  useUpdateMeetingComment,
  useDeleteMeetingComment,
} from "../../hooks/useMeetingComments";
import type { MeetingComment } from "../../types/meetings.types";
import { useEffect } from "react";
import { toast } from "sonner";

type TranscriptsProps = {
  id: string | undefined;
};

const Transcripts = ({ id }: TranscriptsProps) => {
  const meetingId = Number(id);

  const { data, isLoading, isError } = useGetMeetingComments(meetingId);
  
  const { mutate: updateComment } = useUpdateMeetingComment(meetingId);
  const { mutate: deleteComment } = useDeleteMeetingComment(meetingId);

  const comments = data?.data?.data ?? [];

    useEffect(()=> {
      console.log(comments)
    } , [comments])

  const handleEdit = (commentId: number, newText: string) => {
    updateComment({
      commentId,
      payload: { body: newText },
    }, {
      onSuccess : (response)=> {
        toast.success(response.message || "Comment Updated successfully")
      },
      onError : (response)=> {
        toast.error(response.message || "Failed to updated comment ")
      }
    });
  };

  const handleDelete = (commentId: number) => {
    deleteComment(commentId , {
      onSuccess : (response)=> {
        toast.success(response.message || "Comment Deleted successfully")
      },
      onError : (response)=> {
        toast.error(response.message || "Failed to deleted comment ")
      }
    });
  };

  if (!meetingId) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="bg-white rounded-4xl px-4 py-17 flex flex-col gap-5 ml-8 mr-13 mt-10">
        <TranscriptsHeader />
        <div className="h-12 animate-pulse bg-background-secondary rounded-xl" />
        <div className="flex flex-col gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse bg-background-secondary rounded-xl"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white rounded-4xl px-4 py-17 flex flex-col gap-5 ml-8 mr-13 mt-10">
        <TranscriptsHeader />
        <p className="text-destructive text-small">Failed to load transcripts</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-4xl px-4 py-17 flex flex-col gap-5 ml-8 mr-13 mt-10 grow">
      <TranscriptsHeader />
      <SearchInput
        placeholder="Search Transcript"
        width={"full"}
        style={"bg-background-secondary pr-4 pl-11"}
        iconStyle="left-4"
        paramKey="meetingSearch"
      />

      <div className="flex flex-col gap-5">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-small text-center py-8">
            No transcripts yet.
          </p>
        ) : (
          comments.map((comment : MeetingComment) => (
            <TranscriptCard
              key={comment.id}
              id={comment.id}
              name={comment.author?.name || "Unknown"}
              text={comment.body}
              meetingId={meetingId}
              onEdit={handleEdit}
              onDelete={handleDelete}
              canEdit={comment.can_edit}
              canDelete={comment.can_delete}
              createdAt={comment.created_at}
            />
          ))
        )
        }
      </div>
    </section>
  );
};

export default Transcripts;