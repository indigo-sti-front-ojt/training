import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthUser } from "../hocks/AuthUser";
import { useImage } from "../hocks/Image";
import { useShopDB } from "../hocks/ShopDB";
import { useAreaTagDB } from "../hocks/AreaTagDB";
import { useFreeTagDB } from "../hocks/FreeTagDB";
import { useUserDB } from "../hocks/UserDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";

import { UserDBContainer } from "../provider/UserDBProvider";
import { FooterComponet } from "../designComponents/FooterComponent";
import { HeaderComponent } from "../designComponents/HeaderComponent";
import { LodingContainer } from "../provider/LoadingProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { ImageContainer } from "../provider/ImageProvider";

export const Layout = () => {
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

  const { loading } = LodingContainer.useContainer();

  const location = useLocation();

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

  return (
    <>
      <HeaderComponent />
      <main
        className={
          "flex flex-col gap-16 m-auto pt-12 md:pt-0 items-center w-full max-w-4xl" +
          (location.pathname.includes("owner") ? " md:pl-11" : " ")
        }
      >
        {/* <Suspense fallback={<>loading ...</>}>
          <DataView />
        </Suspense> */}
        <Outlet />
      </main>
      <FooterComponet />
      {loading ? (
        <div className="fixed bg-gray-500/50 w-full h-full flex justify-center items-center">
          <div className="animate-spin h-20 w-20 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
