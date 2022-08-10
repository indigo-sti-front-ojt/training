import React, { useEffect, FC } from "react";
import { useComments } from "../../../hooks/api/get/useComment";

type Props = {
  event_id: number;
};

export const Comment: FC<Props> = (props) => {
  const { getComments, comments } = useComments();
  const { event_id } = props;
  useEffect(() => getComments(event_id), []);
  return (
    <>
      <div>
        {comments?.map((comment, i) => (
          <div key={i}>
            <img src={comment.user_icon} alt="ユーザーアイコン" />
            <p>{comment.comment_text}</p>
          </div>
        ))}
      </div>
    </>
  );
};
