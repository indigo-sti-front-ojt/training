import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginUserContext } from "../context/LoginUserContext";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const PrivateRoute = (props: Props) => {
  const { component, redirect } = props;
  const { loginuser } = useLoginUserContext();
  console.log(loginuser);

  if (loginuser?.email === "c-sasaki@sios.com") {
    return <>{component}</>;
  } else {
    return (
      <Navigate to={redirect} state={{ from: useLocation() }} replace={false} />
    );
  }
};
