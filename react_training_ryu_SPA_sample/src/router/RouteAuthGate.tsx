import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthUserContainer } from "../provider/AuthUserProvider";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const RouteAuthGate = (props: Props) => {
  const { component, redirect } = props;
  const { isLoggined } = AuthUserContainer.useContainer();

  if (!isLoggined) {
    return (
      <Navigate to={redirect} state={{ from: useLocation() }} replace={false} />
    );
  }
  return <>{component}</>;
};
