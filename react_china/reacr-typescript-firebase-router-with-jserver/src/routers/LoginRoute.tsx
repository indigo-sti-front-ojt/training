import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginUserContext } from "../context/LoginUserContext";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const LoginRoute = (props: Props) => {
  const { component, redirect } = props;
  const { loginuser } = useLoginUserContext();
  if (loginuser) {
    return (
      <Navigate to={redirect} state={{ from: useLocation() }} replace={false} />
    );
  } else {
    return <>{component}</>;
  }
};
