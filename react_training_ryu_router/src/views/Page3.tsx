import React, { useContext } from "react";

import { useAuthUserRedirect } from "../hocks/AuthUserRedirect";
import { AuthUserContext } from "../provider/AuthUserProvider";

export const Page3 = () => {
  const { login, logout } = useAuthUserRedirect();
  const { isLoggined, user } = useContext(AuthUserContext);

  const AuthRender = isLoggined ? (
    <button onClick={logout}>logout</button>
  ) : (
    <button onClick={login}>login</button>
  );

  return (
    <>
      Page3
      {AuthRender}
      {user.nickname}
    </>
  );
};
