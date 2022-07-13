import React from "react";
import { memo, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLoginUser } from "../../hooks/useLoginUser";

export const Home: FC = memo(() => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClickLogout = () => {
    logout();
    navigate("/login");
  };

  const { loginUser } = useLoginUser();
  console.log(loginUser);

  return (
    <>
      <p>Homeページです。</p>
      <button onClick={onClickLogout}>ログアウト</button>
    </>
  );
});

Home.displayName = "Home";
