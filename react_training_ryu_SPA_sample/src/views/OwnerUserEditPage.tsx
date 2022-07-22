import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../components/InputComponent";
import { useUserDB } from "../hocks/UserDB";
import { UserDBContainer } from "../provider/UserDBProvider";
import { UserDBType } from "../types/UserDBType";

export const OwnerUserEditPage = () => {
  const { userData } = UserDBContainer.useContainer();
  const { UserDataEdit } = useUserDB();
  const img_url: string = userData.photoIcon ?? "";
  const [nickName, setNickname] = useState<string>(userData.nickname ?? "");
  const [singleBio, setSingleBio] = useState<string>(userData.singleBio ?? "");

  const navigate = useNavigate();

  const OnSendButton = () => {
    const tempData: UserDBType = {
      uid: userData.uid,
      photoIcon: userData.photoIcon,
      nickname: nickName,
      singleBio: singleBio,
    };
    UserDataEdit(tempData);
    navigate("/owner/user");
  };
  return (
    <>
      <div>owner edit</div>
      <div>
        <img src={img_url} alt="" />
      </div>
      <InputComponent text={nickName} setText={setNickname} />
      <InputComponent text={singleBio} setText={setSingleBio} />
      <button onClick={OnSendButton}>送信</button>
    </>
  );
};
