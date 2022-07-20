import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Home } from "../components/pages/auth/Home";
import { Layout } from "../layout/Layout";
import { Normal } from "../components/pages/auth/Normal";
import { MyPage } from "../components/pages/auth/MyPage";
import { PrivatePage } from "../components/pages/auth/PrivatePage";
import { NotFound } from "../components/pages/NotFound";
import { Logout } from "../components/pages/Logout";
import { LoginUserProvider } from "../context/LoginUserContext";
import { AuthRoute } from "./AuthRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoginRoute } from "./LoginRoute";

export const Router = () => {
  return (
    <LoginUserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginRoute component={<Login />} redirect="/"/>} />
          <Route path="logout" element={<Logout />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<AuthRoute component={<Home />} redirect="/login"/>} />
            <Route path="normal" element={<AuthRoute component={<Normal />} redirect="/login"/>} />
            <Route path="mypage" element={<AuthRoute component={<MyPage />} redirect="/login"/>} />
            <Route path="privatepage" element={<PrivateRoute component={<PrivatePage/>} redirect="/"/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoginUserProvider>
  );
};
