import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Home } from "../components/pages/auth/Home";
import { Layout } from "../layout/Layout";
import { MyPage } from "../components/pages/auth/MyPage";
import { NotFound } from "../components/pages/NotFound";
import { Logout } from "../components/pages/Logout";
import { LoginUserProvider } from "../context/LoginUserContext";
import { AuthRoute } from "./AuthRoute";
import { LoginRoute } from "./LoginRoute";
import { MyPageEdit } from "../components/pages/auth/MyPageEdit";
import { FirstLogin } from "../components/pages/auth/FirstLogin";
import { EventList } from "../components/pages/auth/EventList";
import { Event } from "../components/pages/auth/Event";
import { EventEdit } from "../components/pages/auth/EventEdit";
import { EventCreate } from "../components/pages/auth/EventCreate";
import { Profile } from "../components/pages/auth/Profile";

export const Router = () => {
  return (
    <LoginUserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={<LoginRoute component={<Login />} redirect="/" />}
          />
          <Route path="logout" element={<Logout />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<AuthRoute component={<Home />} redirect="/login" />}
            />
            <Route
              path="welcome"
              element={
                <AuthRoute component={<FirstLogin />} redirect="/login" />
              }
            />
            <Route path="user" element={<Layout />}>
              <Route
                index
                element={
                  <AuthRoute component={<Profile />} redirect="/login" />
                }
              />
              <Route path="mypage" element={<Layout />}>
                <Route
                  index
                  element={
                    <AuthRoute component={<MyPage />} redirect="/login" />
                  }
                />
                <Route
                  path="edit"
                  element={
                    <AuthRoute component={<MyPageEdit />} redirect="/login" />
                  }
                />
              </Route>
            </Route>
            <Route path="events" element={<Layout />}>
              <Route
                index
                element={
                  <AuthRoute component={<EventList />} redirect="/login" />
                }
              />
              <Route path="event" element={<Layout />}>
                <Route
                  index
                  element={
                    <AuthRoute component={<Event />} redirect="/login" />
                  }
                />
                <Route
                  path="create"
                  element={
                    <AuthRoute component={<EventCreate />} redirect="/login" />
                  }
                />
                <Route
                  path="edit"
                  element={
                    <AuthRoute component={<EventEdit />} redirect="/login" />
                  }
                />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoginUserProvider>
  );
};
