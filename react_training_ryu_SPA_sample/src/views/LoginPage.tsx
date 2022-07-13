import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hocks/AuthUser";

export const LoginPage = () => {
  const { login } = useAuthUser();
  const navigate = useNavigate();

  const ClickLogin = async () => {
    await login();
    navigate("/owner", { replace: true });
  };

  return (
    <>
      <button onClick={ClickLogin}>login</button>
    </>
  );
};
