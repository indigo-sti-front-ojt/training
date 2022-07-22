import React, { useEffect } from "react";
import { useUserDB } from "../hocks/UserDB";
import { UserDBContainer } from "../provider/UserDBProvider";

export const UserListPage = () => {
  const { userDataList } = UserDBContainer.useContainer();
  const { UserDataReads } = useUserDB();
  useEffect(() => {
    UserDataReads();
  }, []);
  return (
    <>
      <div>mypage user list</div>
      {userDataList.map((user) => (
        <div key={user.uid}>
          {user.nickname}
          <img src={user.photoIcon ?? ""} alt="" />
          {user.singleBio}
        </div>
      ))}
    </>
  );
};
