import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { CommentPost } from "../../../types/react-hook-form/CommentPost";
import { Comment } from "../../organisms/comment/Comment";
import { LinkToEventSearch } from "../../organisms/LinkToEventSearch";
import { EventDetail } from "../../organisms/EventDetail";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useLocation } from "react-router-dom";

type State = {
  event_id: number;
};

export const Event = () => {
  const { loginuser } = useLoginUserContext();
  const location = useLocation();
  const state = location.state as State;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentPost>();

  if (loginuser) {
    setValue("user_id", loginuser?.uid);
  }
  if (state?.event_id) setValue("event_id", state?.event_id);


  const onSubmit: SubmitHandler<CommentPost> = (data) => {
    console.log("onSubmit", data);
  };

  return (
    <>
      <h2>イベント</h2>
      <EventDetail event_id={state?.event_id}/>
      <h2>コメント</h2>
      <Comment />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("comment_text", { required: true })} />
        {errors.comment_text && (
          <span style={{ color: "red" }}>コメントが入力されていません</span>
        )}
        <input type="submit" />
      </form>
      <LinkToEventSearch />
    </>
  );
};
