import React, { useEffect, FC } from "react";
import { useComments } from "../../../hooks/api/get/useComment";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommentPost } from "../../../types/react-hook-form/CommentPost";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useCommentCreate } from "../../../hooks/api/postPutDelete/useCommentCreate";

type Props = {
  event_id: number;
};

export const Comment: FC<Props> = (props) => {
  const { loginUser } = useLoginUserContext();

  const { getComments, comments } = useComments();
  const { event_id } = props;
  useEffect(() => getComments(event_id), [comments]);
  const { commentCreate } = useCommentCreate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CommentPost>();

  if (loginUser) {
    setValue("user_id", loginUser.user_id);
  }
  if (event_id) setValue("event_id", event_id);

  const onSubmit: SubmitHandler<CommentPost> = (data) => {
    console.log("onSubmit", data);
    commentCreate(data);
  };

  useEffect(() => {
    setValue("comment_text", "");
  }, [isSubmitSuccessful]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-2">
        <div className="w-full flex flex-col border-2 justify-center rounded-md border-gray-600 gap-10 py-10 px-5">
          {comments?.map((comment, i) => (
            <>
              <div className="flex flex-col w-full" key={i}>
                <div className="flex flex-row gap-x-2">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      src={comment.user_icon}
                      className="w-full h-full object-contain rounded-full ring-2 ring-gray-500"
                    />
                  </div>
                  <div className="p-2 border border-r-black">
                    {comment.comment_text}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>

        <form
          className="w-full flex flex-row gap-x-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="w-full border-2 border-gray-600 outline-1 outline-gray-700 p-2"
            {...register("comment_text", { required: true })}
          />
          {errors.comment_text && (
            <span style={{ color: "red" }}>コメントが入力されていません</span>
          )}
          <button className="flex-shrink-0 rounded-md flex flex-row py-2 px-8 border border-gray-600">
            <span>送信</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};
