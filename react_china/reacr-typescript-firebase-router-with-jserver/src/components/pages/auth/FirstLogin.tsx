import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAllTags } from "../../../hooks/api/useAllTags";
import { User } from "../../../types/api/User";
import { useLoginUserContext } from "../../../context/LoginUserContext";

export const FirstLogin = () => {
  const { loginuser } = useLoginUserContext();

  const { getAllTags, loading, all_tag } = useAllTags();
  useEffect(() => getAllTags(), []);

  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm<User>();

  setValue("user_id", loginuser?.uid);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log("onSubmit", data);
    //ここにpostの処理も追加?
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <>
          <p>ローディング...</p>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {all_tag.map((tag, i) => (
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
      )}
    </>
  );
};
