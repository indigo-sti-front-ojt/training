import React from "react";
import { useSetRecoilState, SetterOrUpdater } from "recoil";
import { useNavigate } from "react-router-dom";
import { fireauth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { typeAuthState, authState } from "../store/AuthState";

export const Login = () => {
  const setAuth: SetterOrUpdater<typeAuthState> = useSetRecoilState(authState);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    hd: "sios.com",
  });
  // ログイン用関数
  const onClickLogin = async () => {
    try {
      await signInWithPopup(fireauth, provider).then((res) => {
        if (res) {
          const tempUser = {
            id: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          };
          setAuth(tempUser);
          navigate("/");
        }
      });
    } catch {
      console.log("ログインに失敗しました");
    }
  };

  return (
    <>
      <button onClick={onClickLogin}>ログイン</button>
    </>
  );
};
