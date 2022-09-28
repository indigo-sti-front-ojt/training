import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { fireauth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authState } from "../store/AuthState";

export const Login = () => {
  const setAuth = useRecoilState(authState);
  const navigate = useNavigate();

  // ログイン用関数
  const onClickLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(fireauth, provider).then((res) => {
        if (res) {
          setAuth(res.user);
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
