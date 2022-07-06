import React, { useContext } from "react";

import { useAuthUser } from "../hocks/AuthUser";
import { AuthUserContext } from "../provider/AuthUserProvider";

export const Page1 = () => {
  const { login, logout } = useAuthUser();
  const { isLoggined, user } = useContext(AuthUserContext);

  const AuthRender = isLoggined ? (
    <button onClick={logout}>logout</button>
  ) : (
    <button onClick={login}>login</button>
  );

  return (
    <>
      Page1
      {AuthRender}
      {user.nickname}
    </>
  );
};
