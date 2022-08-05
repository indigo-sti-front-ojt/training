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
import { InputHolidayComponet } from "./InputHolidayComponent";
import { InputOpenCloseComponent } from "./InputOpenCloseComponent";

type Props = {
  data: ShopDBType | undefined;
  register: UseFormRegister<ShopDBType>;
  handleSubmit: UseFormHandleSubmit<ShopDBType>;
  errors: FieldErrorsImpl<DeepRequired<ShopDBType>>;
  setValue: UseFormSetValue<ShopDBType>;
  onClickDeleteData?: () => void;
  onClickEditData?: (temp: ShopDBType) => void;
  editFlag: boolean;
  onClickSendData?: (temp: ShopDBType) => void;
};
export const ItemFormComponent = (props: Props) => {
  const { data, register, handleSubmit, errors, setValue, editFlag } = props;
  const onSubmit: SubmitHandler<ShopDBType> = (data: ShopDBType) => {
    console.log(data);
    if (editFlag) {
      // edit
    } else {
      // create
    }
  };

  const [Holiday, setHoliday] = useState<number[]>([]);
  const [FromOpenToCloseTime, setFromOpenToCloseTime] = useState<{
    open: string;
    close: string;
  }>({ open: "0:00", close: "0:00" });

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
        {/* linksComponent */}
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
        <input type="submit" value="編集" />
      </form>
      <button>削除</button>
    </>
  );
};
