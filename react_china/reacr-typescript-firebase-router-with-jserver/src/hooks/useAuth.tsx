import { useState } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut,getAdditionalUserInfo } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const fireauth = firebaseApp.fireauth;

//googleログイン用hook
export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'sios.com'
    });
    try {
      setError(false);
      const res = await signInWithPopup(fireauth, provider);
      const isNewUser = getAdditionalUserInfo(res)?.isNewUser
      isNewUser ? navigate("/welcome") : navigate("/");
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
