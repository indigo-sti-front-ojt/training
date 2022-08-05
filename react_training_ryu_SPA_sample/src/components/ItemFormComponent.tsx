import React, { useEffect, useState } from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { ShopDBType } from "../types/ShopDBType";
import { TagTextObject } from "../types/TagTextObject";
import { InputHolidayComponet } from "./InputHolidayComponent";
import { InputLinksComponent } from "./InputLinksComponent";
import { InputOpenCloseComponent } from "./InputOpenCloseComponent";

type Props = {
  data: ShopDBType | undefined;
  register: UseFormRegister<ShopDBType>;
  handleSubmit: UseFormHandleSubmit<ShopDBType>;
  errors: FieldErrorsImpl<DeepRequired<ShopDBType>>;
  setValue: UseFormSetValue<ShopDBType>;
  onClickDeleteData?: () => void;
  onClickEditData?: (temp: ShopDBType) => void;
  onClickSendData?: (temp: ShopDBType) => void;
  editFlag: boolean;
};

export const ItemFormComponent = (props: Props) => {
  const {
    data,
    register,
    handleSubmit,
    errors,
    setValue,
    editFlag,
    onClickEditData,
    onClickDeleteData,
    onClickSendData,
  } = props;

  const onSubmit: SubmitHandler<ShopDBType> = (formData: ShopDBType) => {
    if (editFlag && data?.uid && onClickEditData) {
      // edit
      const temp: ShopDBType = {
        uid: data.uid,
        name: formData.name,
        access: formData.access,
        price: formData.price,
        closingDay: Holiday,
        fromOpenToCleseTime: FromOpenToCloseTime,
        phoneNumber: formData.phoneNumber,
        links: [],
        ShopLink: formData.ShopLink,
        instagramLink: formData.instagramLink,
        photoData: [],
        contents: [],
        areaTag: [],
        freeTag: [],
        writer: data.writer,
      };
      onClickEditData(temp);
    } else {
      // create
      if (onClickSendData) {
        console.log("onclicksend");
      }
    }
  };
  const onSubmitDelete = () => {
    if (onClickDeleteData) {
      onClickDeleteData();
    }
  };

  const [Holiday, setHoliday] = useState<number[]>([]);
  const [FromOpenToCloseTime, setFromOpenToCloseTime] = useState<{
    open: string;
    close: string;
  }>({ open: "0:00", close: "0:00" });
  const [Links, setLinks] = useState<TagTextObject[]>([]);

  useEffect(() => {
    if (data != undefined) {
      setValue("name", data.name);
      setValue("access", data?.access);
      setValue("price", data?.price);
      setValue("phoneNumber", data?.phoneNumber);
      setValue("ShopLink", data?.ShopLink);
      setValue("instagramLink", data?.instagramLink);

      setHoliday(data.closingDay ?? []);
      setFromOpenToCloseTime(
        data.fromOpenToCleseTime ?? { open: "00:00", close: "00:00" }
      );
    }
  }, [data]);
  return (
    <>
      <div>itemcomponent</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span>名前</span>
          <input {...register("name", { required: true })} />
          <>{errors.name?.type == "required" && "入力頼んま"}</>
        </div>
        <div>
          <span>アクセス</span>
          <input {...register("access")} />
        </div>
        <div>
          <span>価格帯</span>
          <input {...register("price")} />
          <span>円以下</span>
        </div>
        <InputHolidayComponet target={Holiday} setTarget={setHoliday} />
        <InputOpenCloseComponent
          target={FromOpenToCloseTime}
          setTarget={setFromOpenToCloseTime}
        />
        <div>
          <span>電話番号</span>
          <input {...register("phoneNumber")} />
        </div>
        <InputLinksComponent target={Links} setTarget={setLinks} />
        <div>
          <span>お店のURL</span>
          <input {...register("ShopLink")} />
        </div>
        <div>
          <span>お店のInstagram</span>
          <input {...register("instagramLink")} />
        </div>
        {/* photoDataComponent */}
        {/* contentsComponent */}
        {/* areaTagComponent */}
        {/* freeTagComponent */}
        <input type="submit" value="編集" />
      </form>
      <button onClick={onSubmitDelete}>削除</button>
    </>
  );
};
