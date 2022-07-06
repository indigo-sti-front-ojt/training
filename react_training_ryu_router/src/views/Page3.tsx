import { Button } from "@mui/material";
import React, { useContext } from "react";

import { useAuthUserRedirect } from "../hocks/AuthUserRedirect";
import { AuthUserContext } from "../provider/AuthUserProvider";
import GoogleIcon from "@mui/icons-material/Google";

export const Page3 = () => {
  const { login, logout } = useAuthUserRedirect();
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
      Page3
      {AuthRender}
      {user.nickname}
    </>
  );
};
