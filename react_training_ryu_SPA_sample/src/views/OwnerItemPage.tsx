import React, { useEffect, useLayoutEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useShopDB } from "../hocks/ShopDB";
import { ShopDBContainer } from "../provider/ShopDBProvider";

export const OwnerItemPage = () => {
  const { id } = useParams();
  const { ShopDataRead } = useShopDB();
  const { shopData } = ShopDBContainer.useContainer();
  useLayoutEffect(() => {
    if (shopData.uid != id && shopData.uid == "") {
      ShopDataRead(id ?? "");
    }
  }, []);
  return (
    <>
      <div>{id}</div>
      <Link to={"edit"}>edit</Link>
      <div>uid:{shopData.uid}</div>
      <div>name:{shopData.name}</div>
      <div>price: {shopData.price}</div>
      <div>closingday:{shopData.closingDay}</div>
      <div>
        {shopData.fromOpenToCleseTime?.open}
        {shopData.fromOpenToCleseTime?.close}
      </div>
      <div>phonenumber:{shopData.phoneNumber}</div>
      <div>writer:{shopData.writer}</div>

      <Outlet />
    </>
  );
};
