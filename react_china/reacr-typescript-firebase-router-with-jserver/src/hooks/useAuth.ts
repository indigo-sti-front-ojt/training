import { useState } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";

import { usePostCreate } from "./api/post/usePostCreate";
import { UserMinInfo } from "../types/api/UserMinInfo";

const fireauth = firebaseApp.fireauth;

//googleログイン用hook
export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  const { postCreate } = usePostCreate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "sios.com",
    });
    try {
      setError(false);
      const res = await signInWithPopup(fireauth, provider);
      const isNewUser = getAdditionalUserInfo(res)?.isNewUser;

      console.log("testt");
      

      if (isNewUser) {
        console.log("isNewUser");
        
        const userRegister:UserMinInfo = {
          user_email: res.user.email ?? "",
          user_name: res.user.displayName ?? "",
          user_icon: res.user.photoURL ?? "",
          user_id: res.user.uid ?? "",
        };
        console.log(userRegister);
        await postCreate("https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/users",userRegister)
        navigate("/welcome");
      } else {
        console.log("User");
        navigate("/");
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