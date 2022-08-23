import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ListChildMapComponent } from "../components/ListChildMapComponent";
import { useAuthUser } from "../hocks/AuthUser";
import { useImage } from "../hocks/Image";
import { useShopDB } from "../hocks/ShopDB";
import { useAreaTagDB } from "../hocks/AreaTagDB";
import { useFreeTagDB } from "../hocks/FreeTagDB";
import { useUserDB } from "../hocks/UserDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { ImageContainer } from "../provider/ImageProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { UserDBContainer } from "../provider/UserDBProvider";

export const Layout = () => {
  const { changeUserState } = useAuthUser();

  const { FreeDataReads } = useFreeTagDB();
  const { AreaDataReads } = useAreaTagDB();

  const { UserDataRead, UserDataReads } = useUserDB();
  const { isLoggined, user } = AuthUserContainer.useContainer();
  const { changeFlag } = UserDBContainer.useContainer();
  const { TagChangeFlag } = TagDBContainer.useContainer();
  const { ShopDataReads_ALL } = useShopDB();
  const { imageEditFlag } = ImageContainer.useContainer();
  const { imageDataReads } = useImage();

  useEffect(() => {
    changeUserState();
    UserDataReads();
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

  const location = useLocation();

  return (
    <>
      <header
        className={
          "flex justify-between items-center w-full h-10 px-4 bg-gray-500/75" +
          (location.pathname.includes("owner") ? " hidden" : "")
        }
      >
        <div className="h-full flex justify-center items-center">layout</div>
        <ul className="flex flex-row gap-4">
          <ListChildMapComponent>
            <Link
              className={
                "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                (location.pathname == "/" ? " bg-black" : "")
              }
              to="/"
            >
              home
            </Link>
            <Link
              className={
                "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                (location.pathname == "/about" ? " bg-black" : "")
              }
              to="/about"
            >
              about
            </Link>
            <Link
              className={
                "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                (location.pathname.includes("/pages") ? " bg-black" : "")
              }
              to="/pages"
            >
              pages
            </Link>
            <Link
              className={
                "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                (location.pathname == "/users" ? " bg-black" : "")
              }
              to="/users"
            >
              users
            </Link>
            <Link
              className={
                "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                (location.pathname == "/login" ||
                location.pathname.includes("owner")
                  ? " bg-black"
                  : "")
              }
              to="/login"
            >
              login
            </Link>
          </ListChildMapComponent>
        </ul>
      </header>
      <main className="flex-grow relative">
        <Outlet />
      </main>
    </>
  );
};
