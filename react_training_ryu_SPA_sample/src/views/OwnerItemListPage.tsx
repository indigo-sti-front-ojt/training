import React from "react";
import { useNavigate } from "react-router-dom";
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
  const onClickCreateLink = () => {
    navigation("/owner/pages-create");
  };
  return (
    <>
      {/* <Link to="/owner/pages-create">create</Link> */}
      <div className="w-full h-20 flex justify-center items-center">
        <button
          className="py-2 px-8 border-2 rounded-md border-blue-500 bg-blue-400 text-white"
          onClick={onClickCreateLink}
        >
          Create
        </button>
      </div>

      <div className="w-full h-16 flex justify-center items-center">
        <span className="text-2xl border-b-2 border-black px-20">
          ページ一覧
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-center flex-wrap gap-3">
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
