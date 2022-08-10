import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { User } from "../../../types/api/User";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useAllTagsContext } from "../../../context/AllTagsContext";

export const FirstLogin = () => {
  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();

  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm<User>();

  setValue("user_id", loginUser?.uid);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log("onSubmit", data);
    //ここにpostの処理も追加?
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {allTags.map((tag, i) => (
          <>
            <div key={i}>
              <label>
                <input
                  {...register("user_tags_id")}
                  type="checkbox"
                  value={tag.id}
                />
                {tag.value}
              </label>
            </div>
          </>
        ))}
        <button type="submit">決定</button>
      </form>
    </>
  );
};
