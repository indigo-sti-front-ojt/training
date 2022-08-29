import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchTagDataComponent } from "../components/SearchTagDataComponent";
import { CardComponent } from "../designComponents/CardComponent";
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { ShopDBType } from "../types/ShopDBType";
export const ItemListPage = () => {
  const { shopDataAll, setShopData } = ShopDBContainer.useContainer();
  const { areaDataList, freeDataList } = TagDBContainer.useContainer();
  const [freeTag, setFreeTag] = useState<string[]>([]);
  const [areaTag, setAreaTag] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);

  const navigation = useNavigate();

  const onClickLink = async (data: ShopDBType) => {
    await setShopData(data);
    navigation(data.uid);
  };

  const onClickReset = () => {
    setFreeTag([]);
    setAreaTag([]);
    setPrice(0);
  };
  const ItemList = () => {
    if (freeTag.length == 0 && areaTag.length == 0 && price == 0)
      return (
        <>
          {shopDataAll.length != 0 ? (
            shopDataAll.map((data: ShopDBType) => (
              <CardComponent
                data={data}
                onClickLink={() => onClickLink(data)}
                key={data.uid}
              />
            ))
          ) : (
            <div>データがありません</div>
          )}
        </>
      );
    const tempListPhase1: ShopDBType[] =
      freeTag.length != 0
        ? shopDataAll.filter((value: ShopDBType) => {
            if (value.freeTag) {
              const temp = [...value.freeTag, ...freeTag];
              const tempSet = new Set(temp);
              return tempSet.size !== temp.length;
            } else {
              return false;
            }
          })
        : shopDataAll;

    const tempListPhase2: ShopDBType[] =
      areaTag.length != 0
        ? tempListPhase1.filter((value: ShopDBType) => {
            if (value.areaTag) {
              const temp = [...value.areaTag, ...areaTag];
              const tempSet = new Set(temp);
              return tempSet.size !== temp.length;
            } else {
              return false;
            }
          })
        : tempListPhase1;

    const tempListPhase3: ShopDBType[] =
      price != 0
        ? tempListPhase2.filter((value: ShopDBType) => {
            if (value.price) {
              return value.price <= price;
            } else {
              return false;
            }
          })
        : tempListPhase2;

    return (
      <>
        {tempListPhase3.length != 0 ? (
          tempListPhase3.map((data: ShopDBType) => (
            <CardComponent
              data={data}
              onClickLink={() => onClickLink(data)}
              key={data.uid}
            />
          ))
        ) : (
          <div>検索結果に一致するデータはありません</div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col w-72 md:w-full p-4 my-2 gap-4 rounded-md shadow-md md:flex-row md:flex-wrap md:gap-0 md:gap-y-6 md:shadow-lg">
        <div className="flex flex-col justify-center w-full text-xl md:w-full gap-1">
          <div className="font-bold text-left">Freeタグ</div>
          <SearchTagDataComponent
            data={freeDataList}
            value={freeTag}
            setValue={setFreeTag}
          />
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:w-full gap-1">
          <div className="font-bold text-left">場所</div>
          <SearchTagDataComponent
            data={areaDataList}
            value={areaTag}
            setValue={setAreaTag}
          />
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:w-1/2 gap-1">
          <div className="font-bold text-left">予算</div>
          <div className="flex flex-row gap-y-2 justify-start items-center">
            <input
              type="number"
              placeholder="input"
              className="form-input w-28"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(Number(e.target.value))
              }
            />
            <div>円以下</div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end w-full text-xl md:w-1/2 gap-1">
          <button className="form-input w-full md:w-24" onClick={onClickReset}>
            リセット
          </button>
        </div>
      </div>

      {/* 検索結果 */}
      <div>
        <div className="w-full h-16 flex justify-center items-center">
          <span className="text-2xl border-b-2 border-black px-20">
            検索結果
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-center flex-wrap gap-3">
          {ItemList()}
        </div>
      </div>
    </>
  );
};
