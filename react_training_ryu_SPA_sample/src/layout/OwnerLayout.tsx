import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useShopDB } from "../hocks/ShopDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { ShopDBContainer } from "../provider/ShopDBProvider";

export const OwnerLayout = () => {
  const { user } = AuthUserContainer.useContainer();
  const { changeFlag } = ShopDBContainer.useContainer();

  const { ShopDataReads_AfterLogin } = useShopDB();

  useEffect(() => {
    ShopDataReads_AfterLogin(user.uid);
  }, [changeFlag]);

  return (
    <>
      <Outlet />
    </>
  );
};
