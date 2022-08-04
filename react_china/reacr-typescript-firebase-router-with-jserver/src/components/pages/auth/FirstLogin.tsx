import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAllTags } from "../../../hooks/api/useAllTags";
import { formAllTags } from "../../../types/react-hook-form/formAllTags";

export const FirstLogin = () => {
  const { getAllTags, loading, all_tag } = useAllTags();
  useEffect(() => getAllTags(), []);

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<formAllTags>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<formAllTags> = (data) => {
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
                      {...register("user_tags")}
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
