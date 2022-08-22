import React from "react";
import { TagDBContainer } from "../provider/TagDBProvider";
import { ShopDBType } from "../types/ShopDBType";
import { CardTagComponent } from "./CardTagComponent";

type Props = {
  data: ShopDBType;
  onClickLink: () => void;
};

export const CardComponent = (props: Props) => {
  const { data, onClickLink } = props;
  const { areaDataList } = TagDBContainer.useContainer();

  const closingDay = data.closingDay?.map((id: number) => {
    switch (id) {
      case 0:
        return (
          <span key={id} className={"text-red-500 " + "card-closingDay"}>
            日
          </span>
        );
      case 1:
        return (
          <span key={id} className={"card-closingDay"}>
            月
          </span>
        );
      case 2:
        return (
          <span key={id} className={"card-closingDay"}>
            火
          </span>
        );
      case 3:
        return (
          <span key={id} className={"card-closingDay"}>
            水
          </span>
        );
      case 4:
        return (
          <span key={id} className={"card-closingDay"}>
            木
          </span>
        );
      case 5:
        return (
          <span key={id} className={"card-closingDay"}>
            金
          </span>
        );
      case 6:
        return (
          <span key={id} className={"text-blue-500 " + "card-closingDay"}>
            土
          </span>
        );
    }
  });

  return (
    <>
      <div
        className="relative flex items-center flex-col h-96 w-72 rounded-md overflow-hidden shadow-md hover:cursor-pointer hover:shadow-lg"
        onClick={onClickLink}
      >
        <figure className="overflow-hidden w-full h-40 rounded-md flex-shrink-0">
          <img
            src={data.mainImage}
            className="w-full h-full object-cover"
            alt=""
          />
        </figure>

        <div className="flex flex-col justify-start items-start flex-grow w-full px-2 py-1 gap-2 mb-2">
          <div className="flex flex-col">
            <div className="text-xl w-full text-left">{data.name}</div>
            <div className="text-xs text-gray-600 w-full text-left">
              {data.title}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-start flex-grow gap-1 text-sm">
            <div className="flex flex-row items-center w-full">
              <span className="w-16 text-left">場所</span>
              <div className="flex flex-row gap-1 overflow-hidden">
                {/* {data.areaTag?.map((tagNumber: number) => (
                  <CardTagComponent
                    key={tagNumber}
                    data={areaDataList[tagNumber]}
                  />
                ))} */}
              </div>
            </div>
            <div className="flex flex-row items-center w-full">
              <span className="w-16 text-left">営業時間</span>
              <div className="flex flex-row items-center text-xl">
                {data.fromOpenToCleseTime?.open}～
                {data.fromOpenToCleseTime?.close}
              </div>
            </div>
            <div className="flex flex-row items-center w-full">
              <span className="w-16 text-left">営業日</span>
              <div className="flex flex-row flex-grow gap-0.5">
                {closingDay && closingDay.length > 6 ? (
                  <span className="font-bold">毎日やっとります！</span>
                ) : (
                  closingDay
                )}
              </div>
            </div>
            <div className="flex flex-row w-full">
              <span className="w-16 text-left">価格帯</span>
              {Number(data.price).toLocaleString()}円以下
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <button className="mx-2 flex-row items-center justify-around py-2 px-4 rounded-lg ring-2 ring-gray-200 flex w-3/4">
              <span className="text-sm mx-2 font-bold">詳細ページへ移動</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
