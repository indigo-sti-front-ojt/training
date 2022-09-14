import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { useUserInfoContext } from "../../../context/UserInfoContext";
import { useUserCreateEdit } from "../../../hooks/api/postPutDelete/useUserCreateEdit";
import { useUser } from "../../../hooks/api/get/useUser";
import { UserFormEdit } from "./MyPageEdit";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyPageEditSchema } from "./MyPageEdit";

export const FirstLogin = () => {
  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();
  const { userInfo } = useUserInfoContext();
  const { userCreateEdit } = useUserCreateEdit();

  // ユーザー情報更新のためのhooksを定義
  const { getUser } = useUser();

  const user_tags_id: Array<number> | undefined = userInfo?.user_tags?.map(
    (checkd_tag) => checkd_tag.tag_id
  );

  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm<UserFormEdit>({
    resolver: yupResolver(MyPageEditSchema),
    defaultValues: {
      user_tags_id: user_tags_id ?? [],
    },
  });

  setValue("user_id", userInfo.user_id ?? "");
  setValue("user_email", userInfo.user_email ?? "");
  setValue("user_icon", userInfo.user_icon ?? "");
  setValue(
    "user_nickname",
    userInfo.user_nickname ?? loginUser?.user_name ?? ""
  );
  setValue("user_tags_id", user_tags_id ?? []);
  setValue("user_coe", userInfo.user_coe ?? "");
  setValue("user_comment", userInfo.user_comment ?? "");
  setValue("user_facebookid", userInfo.user_facebookid ?? "");
  setValue("user_instagramid", userInfo.user_instagramid ?? "");
  setValue("user_lineqr", userInfo.user_lineqr ?? "");
  setValue("user_sl", userInfo.user_sl ?? "");
  setValue("user_twitterid", userInfo.user_twitterid ?? "");

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserFormEdit> = async (data) => {
    await userCreateEdit("put", data);
    loginUser && getUser(loginUser.user_id);
    navigate("/");
  };

  return (
    <>
      <form
        className="w-full flex flex-col items-center gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
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
