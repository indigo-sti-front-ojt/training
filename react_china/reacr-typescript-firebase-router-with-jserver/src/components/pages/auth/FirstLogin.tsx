import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { User } from "../../../types/api/User";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { useUserCreateEdit } from "../../../hooks/api/postPutDelete/useUserCreateEdit";

export const FirstLogin = () => {
  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();
  const { userCreateEdit } = useUserCreateEdit();

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
    userCreateEdit("put", {
      user_id: "sios5105",
      user_icon: "test",
      user_nickname: "aaa",
      user_coe: "偉い人CoE",
      user_sl: "鉄道SL",
      user_comment:
        "右膝がブラックホールになった時全世界のお風呂が34度になる事実はまだ周知されていない",
      user_lineqr: "https:/abcde~",
      user_twitterid: "aaaa",
      user_instagramid: "aaaa",
      user_facebookid: "aaaa",
      user_tags_id: [1, 2, 3],
    });
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {allTags?.map((tag, i) => (
          <>
            <div key={i}>
              <label>
                <input
                  {...register("user_tags_id")}
                  type="checkbox"
                  value={tag.tag_id}
                />
                {tag.tag_value}
              </label>
            </div>
          </>
        ))}
        <button type="submit">決定</button>
      </form>
    </>
  );
};
