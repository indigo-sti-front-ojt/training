import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthUserContainer } from "../provider/AuthUserProvider";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const RouteAuthGate = (props: Props) => {
  const { component, redirect } = props;
  const { isLoggined, isAuthChecked } = AuthUserContainer.useContainer();
  const NaviComponent = () => {
    return (
      <>
        <Navigate
          to={redirect}
          state={{ from: useLocation() }}
          replace={true}
        />
      </>
    );
  };

  if (!isAuthChecked) return <p>認証チェック中</p>;
  if (!isLoggined) {
    return (
      <>
        <NaviComponent />
      </>
    );
  }
  return <>{component}</>;
};
