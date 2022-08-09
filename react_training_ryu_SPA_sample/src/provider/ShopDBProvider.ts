import { useState } from "react";
import { createContainer } from "unstated-next";
import { ShopDBType } from "../types/ShopDBType";
const initialzeshop: ShopDBType = {
  uid: "",
  name: "",
  title: "",
  mainImage: "",
  writer: "",
};

const useShopDBProvider = () => {
  const [changeFlag, setChangeFlag] = useState<boolean>(false);

  const [shopDataAll, setShopDataAll] = useState<ShopDBType[]>([]);
  const [shopData, setShopData] = useState<ShopDBType>(initialzeshop);
  const [shopDataList, setShopDataList] = useState<ShopDBType[]>([]);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  return {
    changeFlag,
    setChangeFlag,
    editFlag,
    setEditFlag,
    shopData,
    setShopData,
    shopDataList,
    setShopDataList,
    shopDataAll,
    setShopDataAll,
  };
};

export const ShopDBContainer = createContainer(useShopDBProvider);
