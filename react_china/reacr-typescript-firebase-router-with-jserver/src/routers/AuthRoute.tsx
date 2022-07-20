import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginUserContext } from "../context/LoginUserContext";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const AuthRoute = (props: Props) => {
  const { component, redirect } = props;
  const { loginuser } = useLoginUserContext();

  if (loginuser === null) {
    return (
      <Navigate to={redirect} state={{ from: useLocation() }} replace={false} />
    );
  } else {
    return <>{component}</>;
  }
};
