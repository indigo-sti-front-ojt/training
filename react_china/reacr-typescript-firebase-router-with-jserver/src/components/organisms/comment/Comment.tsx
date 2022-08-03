import React, { useEffect } from "react";
import { useComments } from "../../../hooks/useComment";

export const Comment = () => {
  const { getComments, comments, loading } = useComments();
  useEffect(() => getComments(), []);
  return (
    <>
      {comments?.map((comment, i) => (
        <div key={i}>
          <img src={comment.user_icon} alt="ユーザーアイコン" />
          <p>{comment.comment_text}</p>
        </div>
      ))}
    </>
  );
};
