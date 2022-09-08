import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginUserContext } from "../context/LoginUserContext";
import { useUserInfoContext } from "../context/UserInfoContext";
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

  const { isUserChecked, userInfo } = useUserInfoContext();

  useEffect(() => {
    getLoginUser();
    getAllTags();

    // ログインができていたらユーザ情報を取得
    if (isAuthChecked && loginUser && !userInfo.user_id) {
      getUser(loginUser.user_id);
    }
  }, [isAuthChecked]);

  if (!isAuthChecked) return <p>認証中</p>;
  if (loginUser === null) {
    // firebaseログインができていない場合
    return (
      <Navigate to={redirect} state={{ from: useLocation() }} replace={false} />
    );
  } else {
    // firebaseログインができている場合
    if (!isUserChecked) return <p>ユーザ認証中</p>;
    if (loginUser.user_id === null) {
      // DBが存在しない場合
      return (
        <Navigate
          to={redirect}
          state={{ from: useLocation() }}
          replace={false}
        />
      );
    } else {
      return <>{component}</>;
    }
  }
};
