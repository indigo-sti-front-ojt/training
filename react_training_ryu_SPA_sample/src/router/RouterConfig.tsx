import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "../views/AboutPage";
import { HomePage } from "../views/HomePage";
import { ItemListPage } from "../views/ItemListPage";
import { ItemPage } from "../views/ItemPage";
import { Layout } from "../layout/Layout";
import { LoginPage } from "../views/LoginPage";
import { NotFoundPage } from "../views/NotFoundPage";
import { OwnerItemCreatePage } from "../views/OwnerItemCreatePage";
import { OwnerItemEditPage } from "../views/OwnerItemEditPage";
import { OwnerItemListPage } from "../views/OwnerItemListPage";
import { OwnerItemPage } from "../views/OwnerItemPage";
import { OwnerLayout } from "../layout/OwnerLayout";
import { OwnerTagPage } from "../views/OwnerTagPage";
import { OwnerUserEditPage } from "../views/OwnerUserEditPage";
import { OutletLayout } from "../layout/OutletLayout";
import { OwnerUserPage } from "../views/OwnerUserPage";
// import { TestView } from "../views/TestView";
// import { UserLayout } from "../views/UserLayout";
// import { UserPage } from "../views/UserPage";
import { RouteAuthGate } from "./RouteAuthGate";
import { RouteAuthGateReverse } from "./RouteAuthGateReverse";
import { OwnerImageUp } from "../views/OwnerImageUp";
import { ScrollTop } from "./ScrollTop";

import { useAuthUser } from "../hocks/AuthUser";
import { useImage } from "../hocks/Image";
import { useShopDB } from "../hocks/ShopDB";
import { useAreaTagDB } from "../hocks/AreaTagDB";
import { useFreeTagDB } from "../hocks/FreeTagDB";
import { useUserDB } from "../hocks/UserDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";

import { UserDBContainer } from "../provider/UserDBProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { ImageContainer } from "../provider/ImageProvider";
export const RouterConfig = () => {
  const { changeUserState } = useAuthUser();

  const { FreeDataReads } = useFreeTagDB();
  const { AreaDataReads } = useAreaTagDB();

  const { UserDataRead } = useUserDB();
  const { isLoggined, user } = AuthUserContainer.useContainer();
  const { changeFlag } = UserDBContainer.useContainer();
  const { TagChangeFlag } = TagDBContainer.useContainer();
  const { ShopDataReads_ALL } = useShopDB();
  const { imageEditFlag } = ImageContainer.useContainer();
  const { imageDataReads } = useImage();
  useEffect(() => {
    changeUserState();
    ShopDataReads_ALL();
  }, []);

  useEffect(() => {
    FreeDataReads();
    AreaDataReads();
  }, [TagChangeFlag]);

  useEffect(() => {
    imageDataReads();
  }, [imageEditFlag]);

  useEffect(() => {
    if (isLoggined) {
      UserDataRead(user.uid);
    }
  }, [isLoggined, changeFlag]);

  console.log("rend");

  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 一般ページ */}
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="pages" element={<OutletLayout />}>
              <Route index element={<ItemListPage />} />
              <Route path=":id" element={<ItemPage />} />
            </Route>
            {/* <Route path="users" element={<UserListPage />} /> */}

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
              <Route index element={<OwnerUserPage />} />
              <Route path="user-edit" element={<OwnerUserEditPage />} />
              <Route path="pages" element={<OutletLayout />}>
                <Route index element={<OwnerItemListPage />} />
                <Route path=":id" element={<OutletLayout />}>
                  <Route index element={<OwnerItemPage />} />
                  <Route path="edit" element={<OwnerItemEditPage />} />
                </Route>
              </Route>
              <Route path="pages-create" element={<OwnerItemCreatePage />} />
              <Route path="tags" element={<OwnerTagPage />} />
              <Route path="images" element={<OwnerImageUp />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
