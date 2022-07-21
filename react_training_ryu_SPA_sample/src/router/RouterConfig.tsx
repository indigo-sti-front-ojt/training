import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "../views/AboutPage";
import { HomePage } from "../views/HomePage";
import { ItemLayout } from "../views/ItemLayout";
import { ItemListPage } from "../views/ItemListPage";
import { ItemPage } from "../views/ItemPage";
import { Layout } from "../views/Layout";
import { LoginPage } from "../views/LoginPage";
import { NotFoundPage } from "../views/NotFoundPage";
import { OwnerItemEditPage } from "../views/OwnerItemEditPage";
import { OwnerItemLayout } from "../views/OwnerItemLayout";
import { OwnerItemListPage } from "../views/OwnerItemListPage";
import { OwnerItemPage } from "../views/OwnerItemPage";
import { OwnerLayout } from "../views/OwnerLayout";
import { OwnerUserEditPage } from "../views/OwnerUserEditPage";
import { OwnerUserLayout } from "../views/OwnerUserLayout";
import { OwnerUserPage } from "../views/OwnerUserPage";
import { TestView } from "../views/TestView";
import { UserLayout } from "../views/UserLayout";
import { UserListPage } from "../views/UserListPage";
import { UserPage } from "../views/UserPage";
import { RouteAuthGate } from "./RouteAuthGate";
import { RouteAuthGateReverse } from "./RouteAuthGateReverse";

export const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 一般ページ */}
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="pages" element={<ItemLayout />}>
              <Route index element={<ItemListPage />} />
              <Route path=":id" element={<ItemPage />} />
            </Route>
            <Route path="users" element={<UserLayout />}>
              <Route index element={<UserListPage />} />
              <Route path=":id" element={<UserPage />} />
            </Route>

            <Route path="test" element={<TestView />} />

            <Route
              path="login"
              element={
                <RouteAuthGateReverse
                  component={<LoginPage />}
                  redirect="/owner"
                />
              }
            />

            {/* 認証が必要 */}
            <Route
              path="owner"
              element={
                <RouteAuthGate component={<OwnerLayout />} redirect="/" />
              }
            >
              <Route path="pages" element={<OwnerItemLayout />}>
                <Route index element={<OwnerItemListPage />} />
                <Route path=":id" element={<OwnerItemPage />}>
                  <Route path="edit" element={<OwnerItemEditPage />} />
                </Route>
              </Route>
              <Route path="user" element={<OwnerUserLayout />}>
                <Route index element={<OwnerUserPage />} />
                <Route path="edit" element={<OwnerUserEditPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
