import React, { ReactNode } from "react";
import { memo,  FC } from "react";
import { Navigate } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";


type Props = {
  path: string;
  element:ReactNode;
};

export const PrivateRoute: FC<Props> = memo((props:Props) => {
  const { path } = props;

  const { loginUser } = useLoginUser();
  console.log(loginUser);
  return loginUser ? (
    <Navigate to={path} />
  ) : (
    <Navigate to="login" />
  );
});

PrivateRoute.displayName = "PrivateRoute";