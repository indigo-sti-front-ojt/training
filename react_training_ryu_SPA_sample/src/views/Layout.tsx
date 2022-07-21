import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthUser } from "../hocks/AuthUser";
import { useUserDB } from "../hocks/UserDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { UserDBContainer } from "../provider/UserDBProvider";

export const Layout = () => {
  const { changeUserState } = useAuthUser();
  const { UserDataRead } = useUserDB();
  const { isLoggined, user } = AuthUserContainer.useContainer();
  const { changeFlag } = UserDBContainer.useContainer();
  useEffect(() => {
    changeUserState();
  }, []);

  useEffect(() => {
    if (isLoggined) {
      UserDataRead(user.uid);
    }
  }, [isLoggined, changeFlag]);

  return (
    <>
      <div>layout</div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/pages">pages</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>

      <Outlet />
    </>
  );
};
