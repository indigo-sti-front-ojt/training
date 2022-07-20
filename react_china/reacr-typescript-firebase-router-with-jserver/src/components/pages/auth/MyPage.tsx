import React from "react";
import { useLoginUserContext } from "../../../context/LoginUserContext";

export const MyPage = () => {
  const { loginuser } = useLoginUserContext();
  console.log(loginuser);
  return (
    <>
      <h1>MyPageページです。</h1>
      <p>表示名: {loginuser?.displayName}</p>
      <p>メール: {loginuser?.email}</p>
      <p>写真url: {loginuser?.photoURL}</p>
      <p>email-verified: {loginuser?.emailVerified}</p>
      <p>userid: {loginuser?.uid}</p>
    </>
  );
};
