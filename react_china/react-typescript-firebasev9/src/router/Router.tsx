import React from "react";
import { memo, FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../components/pages/auth/Login";
import { Register } from "../components/pages/auth/Register";
import { Home } from "../components/pages/Home";
import { NotFound } from "../components/pages/NotFound";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { PrivateRoute } from "../router/PrivateRoute";

export const Router: FC = memo(() => {
  return (
    <LoginUserProvider>
      <Routes>
        {/* <PrivateRoute path="/" element={<Home/>} /> */}
        <Route path="/" element={<PrivateRoute path="/" element={<Home/>} />} />
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </LoginUserProvider>
  );
});

Router.displayName = "Router";
