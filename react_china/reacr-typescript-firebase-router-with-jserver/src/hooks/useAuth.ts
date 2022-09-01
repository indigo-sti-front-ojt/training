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

const fireauth = firebaseApp.fireauth;

//googleログイン用hook
export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  // ユーザー作成apihooks
  const { userCreateEdit } = useUserCreateEdit();

  // logout用hooks
  const { logout } = useLogout();

  // ユーザDB確認のためのユーザ情報取得hooks
  const { getUser } = useUser();

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
        console.log("初回ログイン");
        const userRegister: UserMinInfo = {
          user_email: res.user.email ?? undefined,
          user_name: res.user.displayName ?? undefined,
          user_icon: res.user.photoURL ?? undefined,
          user_id: res.user.uid,
        };
        console.log(userRegister);
        await userCreateEdit("post", userRegister);

        // DB作成が行われた後にユーザDB情報を取得
        getUser(res.user.uid);
        const { userTempInfo } = useUser();

        // --ユーザ作成api実行後、DBが存在すればwelcomeページへ遷移する・存在しなければエラーとしログアウトする--

        if (userTempInfo) {
          // ユーザDBが存在する場合
          console.log("DBのユーザがある");
          navigate("/welcome");
        } else {
          // ユーザDBが存在しない場合
          console.log("DBのユーザがない");
          setError(true);
          logout();
        }
      } else {
        // --2度目以降のログインの場合もユーザDBが存在しない場合はエラーとしてログアウトする--

        console.log("既存ユーザ");
        
        // ユーザDB情報を取得
        getUser(res.user.uid);
        console.log("getUserを実行");
        
        const { userTempInfo } = useUser();

        console.log("既存ユーザ・情報の取得完了");
        

        if (userTempInfo) {
          // ユーザDBが存在する場合
          navigate("/");
        } else {
          // ユーザDBが存在しない場合
          // 再度DB作成apiを叩いてDBの存在を確認しあればwelcomeページへ遷移する
          // なければエラー出してログアウト
          const userRegister: UserMinInfo = {
            user_email: res.user.email ?? undefined,
            user_name: res.user.displayName ?? undefined,
            user_icon: res.user.photoURL ?? undefined,
            user_id: res.user.uid,
          };
          console.log(userRegister);
          await userCreateEdit("post", userRegister);

          // ユーザ作成api実行後・確認のためユーザDB情報を取得
          getUser(res.user.uid);
          const { userTempInfo } = useUser();

          if (userTempInfo) {
            // ユーザDBが存在する場合
            navigate("/welcome");
          } else {
            // ユーザDBが存在しない場合
            console.log("DBのユーザがない");
            setError(true);
            logout();
          }
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
