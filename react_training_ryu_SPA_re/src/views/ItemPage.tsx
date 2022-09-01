import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageItemComponent } from "../designComponents/PageItemComponent";
import { useShopDB } from "../hocks/ShopDB";
import { ShopDBContainer } from "../provider/ShopDBProvider";

export const ItemPage = () => {
  const { id } = useParams();
  // console.log(id);
  const { ShopDataRead } = useShopDB();
  const { shopData } = ShopDBContainer.useContainer();
  useEffect(() => {
    ShopDataRead(id ?? "");
  }, []);
  return (
    <>
      <PageItemComponent data={shopData} />
    </>
  );
};
