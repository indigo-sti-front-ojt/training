import React, { useEffect, useLayoutEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserDB } from "../hocks/UserDB";
import { UserDBContainer } from "../provider/UserDBProvider";
import { UserDBType } from "../types/UserDBType";

type ownerFormType = {
  name: string;
  bio: string;
};

export const OwnerUserEditPage = () => {
  const { userData } = UserDBContainer.useContainer();
  const { UserDataEdit } = useUserDB();
  const img_url: string = userData.photoIcon ?? "";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ownerFormType>();

  useEffect(() => {
    userData.nickname != "" && userData.nickname
      ? setValue("name", userData.nickname)
      : setValue("name", "");

    userData.singleBio != "" && userData.singleBio
      ? setValue("bio", userData.singleBio)
      : setValue("bio", "");
  }, [userData]);

  const onSubmit: SubmitHandler<ownerFormType> = async (
    formData: ownerFormType
  ) => {
    const tempData: UserDBType = {
      uid: userData.uid,
      photoIcon: userData.photoIcon,
      nickname: formData.name,
      singleBio: formData.bio,
    };
    UserDataEdit(tempData);
    navigate("/owner/");
  };
  return (
    <>
      <div className="w-11/12 flex flex-col items-center flex-grow max-w-lg gap-10">
        <div>
          <img src={img_url} alt="" />
        </div>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="form-div">
            <span className="form-title">ニックネーム</span>
            <input
              className="form-input"
              type="text"
              {...register("name", { required: true })}
            />
          </label>
          <label className="form-div">
            <span className="form-title">一言自己紹介</span>
            <input className="form-input" type="text" {...register("bio")} />
          </label>
          <button className="form-input bg-blue-400 text-white">送信</button>
        </form>
      </div>
    </>
  );
};
