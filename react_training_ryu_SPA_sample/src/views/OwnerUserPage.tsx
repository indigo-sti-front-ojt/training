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
      <div>mypage</div>
      <div>{userData.nickname}</div>
      <div>{userData.singleBio}</div>
      <div>
        <img src={img_url} alt="" />
      </div>
      <button onClick={OnClickEdit}>編集</button>
    </>
  );
};
