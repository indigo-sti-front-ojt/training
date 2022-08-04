import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useEvent } from "../../../hooks/api/useEvent";
import { CommentPost } from "../../../types/react-hook-form/CommentPost";
import { Comment } from "../../organisms/comment/Comment";
import { LinkToEventSearch } from "../../organisms/LinkToEventSearch";

export const Event = () => {
  const { loginuser } = useLoginUserContext();
  const { getEvent, event, loading } = useEvent();
  useEffect(() => getEvent(), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentPost>();

  const onSubmit: SubmitHandler<CommentPost> = (data) => {
    console.log("onSubmit", data);
  };

  const navigate = useNavigate();
  const onClickButtonToEdit = () => {
    navigate("edit", {
      state: {
        event_imgurl: event?.event_imgurl,
        event_name: event?.event_name,
        event_note: event?.event_note,
        event_deadline: event?.event_deadline,
        event_date: event?.event_date,
        event_place: event?.event_place,
        event_budget: event?.event_budget,
        event_tags: event?.event_tags,
        event_min_guest: event?.event_min_guest,
        event_max_guest: event?.event_max_guest,
      },
    });
  };

  const onClickApply = () => {
    alert("参加登録しました。");
  };

  return (
    <>
      <h2>イベント</h2>
      {loginuser?.uid === event?.event_owner?.user_id ? (
        <>
          <button type="button" onClick={onClickButtonToEdit}>
            編集
          </button>
        </>
      ) : (
        ""
      )}
      <p>応募締め切り</p>
      <img src={event?.event_imgurl} alt="イベントヘッダー画像" />
      {event?.event_tags?.map((tag, i) => (
        <>
          <div key={i}>
            <span style={{ color: tag.color }}>{tag.value}</span>
          </div>
        </>
      ))}
      <h3>{event?.event_name}</h3>
      <p>{event?.event_note}</p>
      <div>
        <div>
          <p>最小募集人数</p>
          <p>{event?.event_min_guest}人</p>
        </div>
        <div>
          <p>最大募集人数</p>
          <p>{event?.event_max_guest}人</p>
        </div>
        <div>
          <p>主催者</p>
          <img src={event?.event_owner?.user_icon} alt="主催者アイコン" />
          <p>{event?.event_owner?.user_name}</p>
        </div>
        <div>
          <p>予算</p>
          <p>{event?.event_budget}円以下</p>
        </div>
        <div>
          <p>日時</p>
          <p>{event?.event_date}</p>
        </div>
        <div>
          <p>場所</p>
          <p>{event?.event_place}</p>
        </div>
        <h4>参加者</h4>
        <div>
          {event?.event_guests?.map((guest, i) => (
            <>
              <div key={i}>
                <img src={guest?.user_icon} alt="ゲストアイコン" />
              </div>
            </>
          ))}
        </div>
      </div>
      <button onClick={onClickApply}>参加登録</button>
      <h2>コメント</h2>
      <Comment />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("comment_text", { required: true })} />
        {errors.comment_text && (
          <span style={{ color: "red" }}>名前は必ず入力してください</span>
        )}
        <input type="submit" />
      </form>
      <LinkToEventSearch />
    </>
  );
};
