import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useShopDB } from "../hocks/ShopDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { ShopDBContainer } from "../provider/ShopDBProvider";

import { OwnerHeaderComponent } from "../designComponents/OwnerHeaderComponent";

export const OwnerLayout = () => {
  const { user } = AuthUserContainer.useContainer();
  const { changeFlag } = ShopDBContainer.useContainer();

  const { ShopDataReads_AfterLogin } = useShopDB();
  useEffect(() => {
    ShopDataReads_AfterLogin(user.uid);
  }, [changeFlag]);

  return (
    <>
      <OwnerHeaderComponent />
      <main className="md:pl-11 w-full flex justify-center h-full">
        <div className="flex-grow flex flex-col items-center w-full max-w-4xl gap-8 py-12">
          <Outlet />
        </div>
      </main>
    </>
  );
};
