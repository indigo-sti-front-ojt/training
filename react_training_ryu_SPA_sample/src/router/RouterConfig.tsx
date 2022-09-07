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
import { OwnerTagPage } from "../views/OwnerTagPage";
import { OwnerUserEditPage } from "../views/OwnerUserEditPage";
import { OutletLayout } from "../layout/OutletLayout";
import { OwnerUserPage } from "../views/OwnerUserPage";

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
import { ShopDBContainer } from "../provider/ShopDBProvider";
export const RouterConfig = () => {
  const { isLoggined, user } = AuthUserContainer.useContainer();
  const { changeUserState } = useAuthUser();

  const { changeFlag } = UserDBContainer.useContainer();
  const { UserDataRead } = useUserDB();

  const { TagChangeFlag } = TagDBContainer.useContainer();
  const { FreeDataReads } = useFreeTagDB();
  const { AreaDataReads } = useAreaTagDB();

  const { imageEditFlag } = ImageContainer.useContainer();
  const { imageDataReads } = useImage();

  const { changeFlag: ShopChangeFlag } = ShopDBContainer.useContainer();
  const { ShopDataReads_ALL, ShopDataReads_AfterLogin } = useShopDB();

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
      ShopDataReads_AfterLogin(user.uid);
    }
  }, [isLoggined, changeFlag]);

  useEffect(() => {
    if (isLoggined) {
      ShopDataReads_AfterLogin(user.uid);
    }
  }, [ShopChangeFlag]);

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
              {/* <Route
                path=":id"
                element={<RoutePageCheck component={<ItemPage />} />}
              /> */}
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
                <RouteAuthGate component={<OutletLayout />} redirect="/" />
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
