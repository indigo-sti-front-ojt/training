import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { User } from "../../../types/api/User";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { useUserCreateEdit } from "../../../hooks/api/postPutDelete/useUserCreateEdit";
import { UserMinInfo } from "../../../types/api/UserMinInfo";
import { useUser } from "../../../hooks/api/get/useUser";

export const FirstLogin = () => {
  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();
  const { userCreateEdit } = useUserCreateEdit();

  // ユーザー情報更新のためのhooksを定義
  const { getUser } = useUser();

  const userRegister: UserMinInfo = {
    user_email: loginUser?.user_email ?? undefined,
    user_name: loginUser?.user_name ?? undefined,
    user_icon: loginUser?.user_icon ?? undefined,
    user_id: loginUser?.user_id,
  };

  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm<User>({
    defaultValues: {
      user_email: userRegister.user_email,
      user_name: userRegister.user_name,
      user_icon: userRegister.user_icon,
      user_id: userRegister.user_id,
      user_tags_id: [],
      user_coe: "",
      user_comment: "",
      user_facebookid: "",
      user_instagramid: "",
      user_lineqr: "",
      user_nickname: "",
      user_sl: "",
      user_twitterid: "",
    },
  });

  setValue("user_id", loginUser?.user_id);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = async (data) => {
    const temp: User = {
      ...data,
      user_tags_id: data.user_tags_id?.map(Number),
    };
    console.log("onSubmit", temp);
    await userCreateEdit("put", temp);
    loginUser && getUser(loginUser.user_id);
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
