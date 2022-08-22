import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardComponent } from "../designComponents/CardComponent";
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { ShopDBType } from "../types/ShopDBType";
export const OwnerItemListPage = () => {
  const { shopDataList, setShopData } = ShopDBContainer.useContainer();
  const navigation = useNavigate();
  const onClickLink = async (data: ShopDBType) => {
    await setShopData(data);
    navigation(data.uid);
  };
  return (
    <>
      <Link to="/owner/pages-create">create</Link>

      <div>pages</div>
      <div className="flex flex-col md:flex-row gap-3">
        {shopDataList.map((data: ShopDBType) => (
          <CardComponent
            data={data}
            onClickLink={() => onClickLink(data)}
            key={data.uid}
          />
        ))}
      </div>
    </>
  );
};
