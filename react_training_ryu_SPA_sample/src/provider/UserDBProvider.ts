import { useState } from "react";
import { createContainer } from "unstated-next";
import { UserDBType } from "../types/UserDBType";
const initialzeuser: UserDBType = {
  uid: "",
  nickname: "",
  photoIcon: "",
  singleBio: "",
};

const useUserDBProvider = () => {
  const [changeFlag, setChangeFlag] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserDBType>(initialzeuser);
  const [userDataList, setUserDataList] = useState<UserDBType[]>([
    initialzeuser,
  ]);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  return {
    changeFlag,
    setChangeFlag,
    editFlag,
    setEditFlag,
    userData,
    setUserData,
    userDataList,
    setUserDataList,
  };
};

export const UserDBContainer = createContainer(useUserDBProvider);
