import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { ListChildMapComponent } from "../components/ListChildMapComponent";
import { useAuthUser } from "../hocks/AuthUser";
import { useShopDB } from "../hocks/ShopDB";
import { useTagDB } from "../hocks/TagDB";
import { useUserDB } from "../hocks/UserDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { UserDBContainer } from "../provider/UserDBProvider";

export const Layout = () => {
  const { changeUserState } = useAuthUser();
  const { TagDataReads } = useTagDB();
  const { UserDataRead, UserDataReads } = useUserDB();
  const { isLoggined, user } = AuthUserContainer.useContainer();
  const { changeFlag } = UserDBContainer.useContainer();
  const { TagChangeFlag } = TagDBContainer.useContainer();
  const { ShopDataReads_ALL } = useShopDB();
  useEffect(() => {
    changeUserState();
    UserDataReads();
    ShopDataReads_ALL();
  }, []);
  useEffect(() => {
    TagDataReads();
  }, [TagChangeFlag]);
  useEffect(() => {
    if (isLoggined) {
      UserDataRead(user.uid);
    }
  }, [isLoggined, changeFlag]);

  return (
    <>
      <div>layout</div>
      <ul>
        <ListChildMapComponent>
          <Link to="/">home</Link>
          <Link to="/about">about</Link>
          <Link to="/pages">pages</Link>
          <Link to="/users">users</Link>
          <Link to="/login">login</Link>
        </ListChildMapComponent>
      </ul>

      <Outlet />
    </>
  );
};
