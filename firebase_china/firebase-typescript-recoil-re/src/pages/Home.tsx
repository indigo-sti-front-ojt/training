import React from "react";
import { fireauth } from "../firebase";
import { signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/AuthState";

export const Home = () => {
  const setAuth = useSetRecoilState(authState);
  const onClickLogout = async () => {
    try {
      await signOut(fireauth);
      setAuth(null);
      console.log("ログアウトに成功しました");
    } catch {
      console.log("ログアウトに失敗しました");
    }
  };

  return (
    <>
      <p>ようこそ</p>
      <button onClick={onClickLogout}>ログアウト</button>
    </>
  );
};
