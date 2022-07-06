import React, { useContext } from "react";

import { useAuthUser } from "../hocks/AuthUser";
import { AuthUserContext } from "../provider/AuthUserProvider";

import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";

export const Page1 = () => {
  const { login, logout } = useAuthUser();
  const { isLoggined, user } = useContext(AuthUserContext);

  const AuthRender = isLoggined ? (
    <Button variant="outlined" onClick={logout} startIcon={<GoogleIcon />}>
      Logout
    </Button>
  ) : (
    <Button variant="outlined" onClick={login} startIcon={<GoogleIcon />}>
      Login
    </Button>
  );

  return (
    <>
      Page1
      {AuthRender}
      {user.nickname}
    </>
  );
};
