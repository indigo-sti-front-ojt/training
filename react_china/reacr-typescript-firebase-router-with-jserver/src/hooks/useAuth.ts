import {  useState } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import { useUserCreateEdit } from "./api/postPutDelete/useUserCreateEdit";
import { UserMinInfo } from "../types/api/UserMinInfo";
import { useLoginUserContext } from "../context/LoginUserContext";
//import { useUserInfoContext } from "../context/UserInfoContext";
import { useUser } from "./api/get/useUser";

const fireauth = firebaseApp.fireauth;

//googleログイン用hook
export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  // ユーザー作成apihooks
  const { userCreateEdit } = useUserCreateEdit();
  //ユーザー取得api hooks
  const { getUser } = useUser();
  // ユーザ情報取得判別
  //const { isUserChecked, userInfo } = useUserInfoContext();

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

      // ユーザーDBの有無から初回ログインを判定
      const res2 = await getUser(res.user.uid);

      if (!res2) {
        console.log("ユーザDBが存在しないためDBを作成して初回ログインページへ");
        const userRegister: UserMinInfo = {
          user_email: res.user.email ?? undefined,
          user_name: res.user.displayName ?? undefined,
          user_icon: res.user.photoURL ?? undefined,
          user_id: res.user.uid,
        };
        console.log("初回ログイン登録情報", userRegister);
        await userCreateEdit("post", userRegister);
        navigate("/welcome");
      } else {
        console.log("ログイン成功");
        navigate("/");
      }

      // const isNewUser = getAdditionalUserInfo(res)?.isNewUser;

      // if (isNewUser) {
      //   console.log("初回ログイン");
      //   const userRegister: UserMinInfo = {
      //     user_email: res.user.email ?? undefined,
      //     user_name: res.user.displayName ?? undefined,
      //     user_icon: res.user.photoURL ?? undefined,
      //     user_id: res.user.uid,
      //   };
      //   console.log(userRegister);
      //   await userCreateEdit("post", userRegister);
      //   navigate("/welcome");
      // } else {
      //   navigate("/");
      // }

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
        const loginUserInfo = {
          user_email: loginUser.email,
          user_name: loginUser.displayName,
          user_icon: loginUser.photoURL,
          user_id: loginUser.uid,
        };
        setLoginUser(loginUserInfo);
      }
      setIsAuthChecked(true);
    });
  };

  return { getLoginUser };
};
