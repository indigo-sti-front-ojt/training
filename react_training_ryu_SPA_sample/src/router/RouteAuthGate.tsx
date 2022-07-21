import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthUserContainer } from "../provider/AuthUserProvider";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const RouteAuthGate = (props: Props) => {
  const { component, redirect } = props;
  const { isLoggined, isAuthChecked } = AuthUserContainer.useContainer();
  if (!isAuthChecked) return <p>認証チェック中</p>;
  if (!isLoggined) {
    return (
      <Navigate to={redirect} state={{ from: useLocation() }} replace={false} />
    );
  }
  return <>{component}</>;
};
