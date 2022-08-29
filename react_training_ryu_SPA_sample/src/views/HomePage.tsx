import React from "react";
import { useNavigate } from "react-router-dom";
import { CardComponent } from "../designComponents/CardComponent";
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { ShopDBType } from "../types/ShopDBType";

import homePageImage from "../images/homePage.png";
import homeImageMD from "../images/homeImageMD.png";
import homeImageSM from "../images/homeImageSM.png";

import { useWindowSize } from "../hocks/resizeWindowSize";
import { TopCardCompoent } from "../designComponents/TopCardCompoent";

export const HomePage = () => {
  const { shopDataAll, setShopData } = ShopDBContainer.useContainer();
  const navigation = useNavigate();
  const breakPoint = useWindowSize();

  const onClickLink = async (data: ShopDBType) => {
    await setShopData(data);
    navigation(`pages/${data.uid}`);
  };
  const onClickMore = () => {
    navigation("pages");
  };

  const NewDataList =
    shopDataAll.length <= 3 ? shopDataAll : shopDataAll.slice(0, 3);

  return (
    <>
      <div className="w-full relative">
        {/* main card */}
        <img
          src={breakPoint == "sm" ? homeImageSM : homeImageMD}
          alt=""
          className="w-full h-auto object-contain"
        />
        <div className="absolute top-1/2 w-full transform  -translate-y-1/2 md:top-full md:translate-x-0 md:-translate-y-full md:right-0 md:w-96 md:h-44 flex flex-col justify-center items-center md:items-start py-10 md:py-2 px-8 gap-4 bg-gray-500/80">
          <span className="text-3xl font-bold text-white">
            関東のうまいものを一括で
          </span>
          <span className="text-lg font-bold text-white">
            東京のうまいものをイッキ見
          </span>
        </div>
      </div>

      <div>
        <div className="w-full h-16 flex justify-center items-center">
          <span className="text-2xl border-b-2 border-black px-20">
            新着記事
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-center flex-wrap gap-3">
          {NewDataList.length != 0 ? (
            breakPoint == "sm" ? (
              NewDataList.slice(0, 1).map((data: ShopDBType) => (
                <CardComponent
                  data={data}
                  onClickLink={() => onClickLink(data)}
                  key={data.uid}
                />
              ))
            ) : (
              NewDataList.map((data: ShopDBType) => (
                <CardComponent
                  data={data}
                  onClickLink={() => onClickLink(data)}
                  key={data.uid}
                />
              ))
            )
          ) : (
            <></>
          )}
        </div>
        <div className="w-full h-16 flex justify-center items-center">
          <span
            className="md:w-3/4 text-center text-2xl border-2 border-black rounded-lg px-20 md:px-0 hover:cursor-pointer"
            onClick={onClickMore}
          >
            MORE...
          </span>
        </div>
      </div>

      <div className="w-72 md:w-full flex flex-col md:flex-row">
        <TopCardCompoent
          url={homePageImage}
          title="目的や地域別に簡単に検索"
          content={
            <>
              お店はどうやって探しますか？ここでは、管理人たちが実際に訪れて好きだったお店を自由に掲載しています。
              <br />
              私たちが探したお店があなたの好みに合致しているとうれしいです。Instagramで紹介もしてます!!
            </>
          }
        />
      </div>
    </>
  );
};
