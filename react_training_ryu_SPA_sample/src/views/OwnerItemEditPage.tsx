import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../components/InputComponent";
import { useShopDB } from "../hocks/ShopDB";
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { ShopDBType } from "../types/ShopDBType";
import { TagTextObject } from "../types/TagTextObject";

export const OwnerItemEditPage = () => {
  const [writer, setWriter] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [access, setAccess] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [closingDay, setClosingday] = useState<number[]>([]);
  const [fromOpenToCloseTime, setFromOpenToCloseTime] = useState<{
    open: string;
    close: string;
  }>({ open: "", close: "" });
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [shopLink, setShopLink] = useState<string>("");
  const [links, setLinks] = useState<TagTextObject[]>([]);
  const [instagramLink, setInstagramLink] = useState<string>("");
  const [photoData, setPhotoData] = useState<string[]>([]);
  const [contents, setContents] = useState<TagTextObject[]>([]);
  const [areaTag, setAreaTag] = useState<number[]>([]);
  const [freeTag, setFreeTag] = useState<number[]>([]);

  const { shopData } = ShopDBContainer.useContainer();
  const { ShopDataDelete, ShopDataEdit } = useShopDB();

  const navigate = useNavigate();

  useEffect(() => {
    setWriter(shopData.writer);
    setUid(shopData.uid);
    setName(shopData.name);
    setAccess(shopData.access ?? "");
    setPrice(shopData.price ?? "");
    setClosingday(shopData.closingDay ?? []);
    setFromOpenToCloseTime(
      shopData.fromOpenToCleseTime ?? { open: "", close: "" }
    );
    setPhoneNumber(shopData.phoneNumber ?? "");
    setShopLink(shopData.ShopLink ?? "");
    setLinks(shopData.links ?? []);
    setInstagramLink(shopData.instagramLink ?? "");
    setPhotoData(shopData.photoData ?? []);
    setContents(shopData.contents ?? []);
    setAreaTag(shopData.areaTag ?? []);
    setFreeTag(shopData.freeTag ?? []);
  }, []);

  const onClickSendData = () => {
    const temp: ShopDBType = {
      uid: uid,
      name: name,
      access: access,
      price: price,
      closingDay: closingDay,
      fromOpenToCleseTime: fromOpenToCloseTime,
      phoneNumber: phoneNumber,
      links: links,
      ShopLink: shopLink,
      instagramLink: instagramLink,
      photoData: photoData,
      contents: contents,
      areaTag: areaTag,
      freeTag: freeTag,
      writer: writer,
    };
    ShopDataEdit(temp);
    navigate("/owner/pages", { replace: true });
  };
  const onClickDeleteData = () => {
    ShopDataDelete(uid);
    navigate("/owner/pages", { replace: true });
  };
  return (
    <>
      <div>edit</div>
      <div>
        <span>name</span>
        <InputComponent text={name} setText={setName} />
      </div>
      <div>
        <span>accsess</span>
        <InputComponent text={access} setText={setAccess} />
      </div>
      <div>
        <span>price</span>
        <InputComponent text={price} setText={setPrice} />
      </div>
      <div>
        <span>closingDay</span>
        {/* 日付選択コンポーネント */}
      </div>
      <div>
        <span>fromopentoclosetime</span>
        {/* 営業時間開始終了コンポーネント */}
      </div>
      <div>
        <span>phoneNumber</span>
        <InputComponent text={phoneNumber} setText={setPhoneNumber} />
      </div>
      <div>
        <span>links</span>
        {/* links作成コンポーネント */}
      </div>
      <div>
        <span>shopLink</span>
        <InputComponent text={shopLink} setText={setShopLink} />
      </div>
      <div>
        <span>instagramlink</span>
        <InputComponent text={instagramLink} setText={setInstagramLink} />
      </div>
      <div>
        <span>photoData</span>
        {/* photodata作成コンポーネント */}
      </div>
      <div>
        <span>content</span>
        {/* コンテント作成コンポーネント */}
      </div>
      <div>
        <span>areatag</span>
        {/* areatag作成コンポーネント */}
      </div>
      <div>
        <span>freetag</span>
        {/* freetag作成コンポーネント */}
      </div>
      <div>
        <span>write~~~</span>
      </div>
      <div>
        <button onClick={onClickSendData}>送信</button>
        <button onClick={onClickDeleteData}>削除</button>
      </div>
    </>
  );
};
