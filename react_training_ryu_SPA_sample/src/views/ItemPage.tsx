import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShopDB } from "../hocks/ShopDB";
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { ShopDBType } from "../types/ShopDBType";

export const ItemPage = () => {
  const { id } = useParams();
  console.log(id);
  const { ShopDataRead } = useShopDB();
  const { shopData } = ShopDBContainer.useContainer();
  useEffect(() => {
    ShopDataRead(id ?? "");
  }, []);
  return (
    <>
      <div>{id}</div>
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
    </>
  );
};
