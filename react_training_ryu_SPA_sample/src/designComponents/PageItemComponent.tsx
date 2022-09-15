import React from "react";
import { TagDBContainer } from "../provider/TagDBProvider";
import { ShopDBType } from "../types/ShopDBType";
import { TagDBType } from "../types/TagDBType";
import { TagTextObject } from "../types/TagTextObject";
import { IFrameComponent } from "./IFrameCompoent";
import { MansoryImageComponent } from "./MasonryImageComponent";
import { TagComponent } from "./TagComponent";

type Props = {
  data: ShopDBType;
};
export const PageItemComponent = (props: Props) => {
  const { data } = props;
  const { freeDataList } = TagDBContainer.useContainer();

  const FreeTagViewData = data.freeTag?.map((value: string) => {
    const temp = freeDataList.find((temp: TagDBType) => temp.id == value);
    if (temp) {
      return <TagComponent key={value} data={temp} />;
    }
  });

  const Contents = data.contents?.map((value: TagTextObject, index: number) => {
    return (
      <span className="w-full text-xl text-left" key={index}>
        {value.tag}
        {value.text}
      </span>
    );
  });

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

  const onClickLink = (url: string, flag: boolean) => {
    if (flag) {
      location.href = url;
    } else {
      location.href = `https://www.instagram.com/${url}`;
    }
  };

  const Links = data.links?.map((value: TagTextObject) => {
    switch (value.tag) {
      case "食べログ":
        if (value.text.length > 5)
          return (
            <div
              className="py-2 px-8 rounded-md border-2 border-black hover:cursor-pointer"
              key={value.tag}
              onClick={() => onClickLink(value.text, true)}
            >
              食べログ
            </div>
          );
        break;
      case "ぐるなび":
        if (value.text.length > 5)
          return (
            <div
              className="py-2 px-8 rounded-md border-2 border-black hover:cursor-pointer"
              key={value.tag}
              onClick={() => onClickLink(value.text, true)}
            >
              ぐるなび
            </div>
          );
        break;
      case "instagram":
        return (
          <div
            className="py-2 px-8 rounded-md border-2 border-black hover:cursor-pointer"
            key={value.tag}
            onClick={() => onClickLink(value.text, false)}
          >
            instagram
          </div>
        );
    }
  });

  return (
    <>
      <div className="w-11/12 flex flex-col gap-1">
        <span className="text-2xl text-left border-b-2 border-gray-700">
          {data.title}
        </span>
        <figure className="flex items-center justify-center w-full h-auto">
          <img
            src={data.mainImage}
            alt=""
            className="h-auto max-h-52 md:max-h-[500px] md:h-full w-auto object-contain rounded-md border-4 border-gray-300"
          />
        </figure>
        <div className="w-full flex flex-row flex-wrap gap-y-2">
          {FreeTagViewData}
        </div>
        <div className="w-full flex flex-col">{Contents}</div>
      </div>

      <div className="w-11/12 flex flex-col items-center gap-2">
        <span className="flex-grow-0 w-full md:w-3/4 text-2xl border-b-2 border-gray-700">
          店舗情報
        </span>
        <div className="w-full flex flex-col md:flex-row gap-3 p-4 bg-pink-600/20 rounded-md">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <div className="w-full flex flex-col md:flex-row">
              <span className="w-24 text-left">店舗名</span>
              <span className="w-full md:w-auto flex-grow font-bold text-xl">
                {data.name}
              </span>
            </div>
            <div className="w-full flex flex-col md:flex-row">
              <span className="w-24 text-left">価格帯</span>
              <span className="w-full md:w-auto flex-grow font-bold text-xl">
                {data.price}円以下
              </span>
            </div>
            <div className="w-full flex flex-col md:flex-row">
              <span className="w-24 text-left">営業時間</span>
              <span className="w-full md:w-auto flex-grow font-bold text-xl">
                {data.fromOpenToCleseTime?.open}~
                {data.fromOpenToCleseTime?.close}
              </span>
            </div>
            <div className="w-full flex flex-col md:flex-row">
              <span className="w-24 text-left">営業日</span>
              <div className="flex flex-row justify-center flex-grow gap-0.5">
                {closingDay && closingDay.length > 6 ? (
                  <span className="font-bold text-xl">毎日やっとります！</span>
                ) : (
                  closingDay
                )}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
              <span className="w-24 text-left">アクセス</span>
              <span className="w-full md:w-auto flex-grow font-bold text-xl">
                {data.access}
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="w-24 text-left">Links</span>
              <span className="w-full md:w-auto flex flex-row justify-center flex-wrap gap-4 flex-grow font-bold text-xl">
                {Links}
              </span>
            </div>
          </div>

          <div className="w-full h-96 md:w-1/2 p-2">
            {<IFrameComponent mapData={data.map} />}
          </div>
        </div>
      </div>

      <MansoryImageComponent imageData={data.photoData} />
    </>
  );
};
