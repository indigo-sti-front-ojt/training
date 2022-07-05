import React, { useContext } from "react";

import { useAuth } from "../hocks/AuthUser";
import { AuthUserContext } from "../provider/AuthUserProvider";

export const Page1 = () => {
  const { login, logout } = useAuth();
  const { isLoggined } = useContext(AuthUserContext);

  const AuthRender = () => {
    const RenderButton = isLoggined ? (
      <button onClick={logout}>logout</button>
    ) : (
      <button onClick={login}>login</button>
    );
    return RenderButton;
  };
  return (
    <>
      Page1
      {AuthRender()}
    </>
  );
};
