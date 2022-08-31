import { useState } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import { useUserCreateEdit } from "./api/postPutDelete/useUserCreateEdit";
import { UserMinInfo } from "../types/api/UserMinInfo";
import { useLoginUserContext } from "../context/LoginUserContext";
import { useUser } from "./api/get/useUser";
import { useUserInfoContext } from "../context/UserInfoContext";

const fireauth = firebaseApp.fireauth;

//googleログイン用hook
export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  // ユーザー作成apihooks
  const { userCreateEdit } = useUserCreateEdit();

  // ユーザDB確認のためのユーザコンテキスト更新用hooks と ユーザコンテキスト
  const { getUser } = useUser();
  const { userInfo } = useUserInfoContext();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "sios.com",
    });
    try {
      setError(false);
      // ログイン
      const res = await signInWithPopup(fireauth, provider);

      // --初めてのログインの場合・firebaseユーザ情報を利用してユーザDBを作成--
      const isNewUser = getAdditionalUserInfo(res)?.isNewUser;
      if (isNewUser) {
        console.log("isNewUser");
        const userRegister: UserMinInfo = {
          user_email: res.user.email ?? undefined,
          user_name: res.user.displayName ?? undefined,
          user_icon: res.user.photoURL ?? undefined,
          user_id: res.user.uid,
        };
        console.log(userRegister);
        await userCreateEdit("post", userRegister);
        navigate("/welcome");
      } else {
        // ユーザ情報をコンテキストにセット
        getUser(res.user.uid);

        // --初めてのログインではない場合・ユーザDBが存在すればトップページへ遷移する--
        if (userInfo) {
          navigate("/");
        } else {
          // --さらにユーザDBが存在しない場合・DB作成apiを叩いてwelcomeページへ遷移する--
          const userRegister: UserMinInfo = {
            user_email: res.user.email ?? undefined,
            user_name: res.user.displayName ?? undefined,
            user_icon: res.user.photoURL ?? undefined,
            user_id: res.user.uid,
          };
          console.log(userRegister);
          await userCreateEdit("post", userRegister);
          navigate("/welcome");
        }
      }

      setSuccess(true);
    } catch {
      console.log("ログインに失敗しました");
      setError(true);
    }
  };
  return { success, error, loginWithGoogle };
};

// ログアウト用hook
export const useLogout = () => {
  const logout = async () => {
    try {
      await signOut(fireauth);
      console.log("Sign-out successful.");
    } catch {
      console.log("ログアウトに失敗しました");
    }
  };

  return { logout };
};

// ログインユーザー取得hooks
export const useLoginUser = () => {
  const { setLoginUser, setIsAuthChecked } = useLoginUserContext();

  const getLoginUser = async () => {
    const auth = getAuth();
    await onAuthStateChanged(auth, async (loginUser) => {
      if (loginUser) {
        setLoginUser(loginUser);
      }
      setIsAuthChecked(true);
    });
  };

  return { getLoginUser };
};
