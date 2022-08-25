import React from "react";
import { useNavigate } from "react-router-dom";
import { UserDBContainer } from "../provider/UserDBProvider";

export const OwnerUserPage = () => {
  const { userData } = UserDBContainer.useContainer();
  const img_url: string = userData.photoIcon ?? "";
  const navigate = useNavigate();
  const OnClickEdit = () => {
    navigate("user-edit");
  };
  return (
    <>
      <div className="w-full items-center justify-center flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-4xl">ようこそ</span>
          <span className="text-6xl">{userData.nickname}</span>
        </div>
        <div className="h-40 w-auto">
          <img src={img_url} alt="" className="h-full w-auto object-contain" />
        </div>
        <button
          className="py-2 px-8 rounded-md border-4 border-gray-500 text-2xl"
          onClick={OnClickEdit}
        >
          編集
        </button>
      </div>
    </>
  );
};
