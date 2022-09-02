import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginUserContext } from "../context/LoginUserContext";
import { useUser } from "../hooks/api/get/useUser";
import { useLoginUser } from "../hooks/useAuth";
import { useAllTags } from "../hooks/api/get/useAllTags";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const AuthRoute = (props: Props) => {
  const { component, redirect } = props;

  // ログインユーザー・全タグのセット
  const { getLoginUser } = useLoginUser();
  const { getUser } = useUser();
  const { getAllTags } = useAllTags();

  const { loginUser, isAuthChecked } = useLoginUserContext();

  useEffect(() => {
    getLoginUser();
    getAllTags();

    // ログインができていたらユーザ情報を取得
    if (loginUser) {
      getUser(loginUser.user_id);
    }
  }, [isAuthChecked]);

  if (!isAuthChecked) return <p>認証中</p>;
  if (loginUser === null) {
    return (
      <Navigate to={redirect} state={{ from: useLocation() }} replace={false} />
    );
  } else {
    return <>{component}</>;
  }
};
