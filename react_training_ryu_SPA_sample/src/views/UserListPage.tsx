import React from "react";
import { UserDBContainer } from "../provider/UserDBProvider";

export const UserListPage = () => {
  const { userDataList } = UserDBContainer.useContainer();

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
