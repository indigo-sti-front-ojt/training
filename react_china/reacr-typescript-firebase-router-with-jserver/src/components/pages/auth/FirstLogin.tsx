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
      <form
        className="w-full flex flex-col items-center gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* {allTags?.map((tag, i) => (
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
        ))} */}
        <div className="w-full flex flex-col md:flex-row items-center flex-wrap gap-5">
          {allTags?.map((tag, i) => (
            <>
              <label key={i} className="">
                <input
                  type="checkbox"
                  className="peer hidden"
                  {...register("user_tags_id")}
                  value={tag.tag_id}
                />
                <div className="tips-checkbox border-green-500 bg-green-400 text-white">
                  {tag.tag_value}
                </div>
              </label>
            </>
          ))}
        </div>

        {/* <button type="submit">決定</button> */}
        <button
          type="submit"
          className="flex justify-center items-center w-48 h-12 text-white font-bold hover:cursor-pointer bg-black relative overflow-hidden group transition-colors delay-100 hover:text-black"
        >
          <span className="z-10">PUSH!</span>
          <div className="z-0 absolute top-0 left-0 w-96 h-96 transition-transform origin-top-left rotate-45 group-hover:-translate-y-1/2 gruop-hover:translate-x-1/2 bg-red-600"></div>
        </button>
      </form>
    </>
  );
};
