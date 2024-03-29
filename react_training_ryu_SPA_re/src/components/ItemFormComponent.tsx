import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrorsImpl,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { ImageContainer } from "../provider/ImageProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { ShopDBType } from "../types/ShopDBType";
import { InputHolidayComponet } from "./InputHolidayComponent";
import { InputLinksComponent } from "./InputLinksComponent";
import { InputOpenCloseComponent } from "./InputOpenCloseComponent";
import { InputPhotoComponent } from "./InputPhotoComponent";
import { InputPhotoDataComponent } from "./InputPhotoDataComponent";
import { InputSimpleComponent } from "./InputSimpleComponent";
import { InputTagDataComponent } from "./InputTagDataComponent";

type Props = {
  data: ShopDBType | undefined;
  register: UseFormRegister<ShopDBType>;
  handleSubmit: UseFormHandleSubmit<ShopDBType>;
  errors: FieldErrorsImpl<DeepRequired<ShopDBType>>;
  setValue: UseFormSetValue<ShopDBType>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ShopDBType, any>;
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
    control,
    editFlag,
    onClickEditData,
    onClickDeleteData,
    onClickSendData,
  } = props;

  const { areaDataList, freeDataList } = TagDBContainer.useContainer();
  const { imageDataList } = ImageContainer.useContainer();
  const [focusFlag, setFocusFlag] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ShopDBType> = (formData: ShopDBType) => {
    if (editFlag && data?.uid && onClickEditData) {
      // edit
      const temp: ShopDBType = {
        uid: data.uid,
        name: formData.name,
        title: formData.title,
        mainImage: formData.mainImage,
        access: formData.access,
        map: formData.map,
        price: Number(formData.price),
        closingDay: formData.closingDay,
        fromOpenToCleseTime: formData.fromOpenToCleseTime,
        phoneNumber: formData.phoneNumber,
        links: formData.links,
        ShopLink: formData.ShopLink,
        photoData: formData.photoData,
        contents: formData.contents,
        areaTag: formData.areaTag,
        freeTag: formData.freeTag,
        writer: data.writer,
        createDate: data.createDate,
      };
      onClickEditData(temp);
    } else if (onClickSendData && data != undefined) {
      // create
      const temp: ShopDBType = {
        uid: "",
        name: formData.name,
        title: formData.title,
        mainImage: formData.mainImage,
        access: formData.access,
        map: formData.map,
        price: Number(formData.price),
        closingDay: formData.closingDay,
        fromOpenToCleseTime: formData.fromOpenToCleseTime,
        phoneNumber: formData.phoneNumber,
        links: formData.links,
        ShopLink: formData.ShopLink,
        photoData: formData.photoData,
        contents: formData.contents,
        areaTag: formData.areaTag,
        freeTag: formData.freeTag,
        writer: data.writer,
        createDate: data.createDate,
      };

      onClickSendData(temp);
    }
  };
  const onSubmitDelete = () => {
    if (onClickDeleteData) {
      onClickDeleteData();
    }
  };

  useEffect(() => {
    if (data != undefined && editFlag && !focusFlag) {
      setValue("name", data.name);
      setValue("title", data.title);
      setValue("mainImage", data.mainImage);
      setValue("contents", data?.contents);
      setValue("map", data?.map);
      setValue("access", data?.access);
      setValue("price", data?.price);
      setValue("phoneNumber", data?.phoneNumber);
      setValue("ShopLink", data?.ShopLink);
      setValue("closingDay", data?.closingDay);
      setValue("links", data?.links);
      setValue("photoData", data?.photoData);
      setValue("fromOpenToCleseTime", data?.fromOpenToCleseTime);
      setValue("freeTag", data?.freeTag);
      setValue("areaTag", data?.areaTag);
    } else if (!focusFlag) {
      setValue("name", "");
      setValue("title", "");
      setValue("mainImage", "https://placehold.jp/200x200.png");
      setValue("contents", []);
      setValue("access", "");
      setValue("map", "");
      setValue("price", 0);
      setValue("phoneNumber", "");
      setValue("ShopLink", "");
      setValue("closingDay", []);
      setValue("links", []);
      setValue("photoData", []);
      setValue("fromOpenToCleseTime", { open: "00:00", close: "00:00" });
      setValue("freeTag", []);
      setValue("areaTag", []);
    }
  }, [data]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5 w-full px-5"
        onFocus={() => setFocusFlag(true)}
      >
        <div className="form-div">
          <span className="form-title">title</span>
          <input
            className="form-input"
            {...register("title", { required: true })}
          />
          <>{errors.title?.type == "required" && "入力頼んま"}</>
        </div>
        <div className="form-div">
          <span className="form-title">mainImage</span>
          <Controller
            control={control}
            name="mainImage"
            rules={{ required: true }}
            render={({ field }) => (
              <InputPhotoComponent
                value={field.value}
                onChange={field.onChange}
                data={imageDataList}
              />
            )}
          />
        </div>
        <div className="form-div">
          <span className="form-title">名前</span>
          <input
            className="form-input"
            {...register("name", { required: true })}
          />
          <>{errors.name?.type == "required" && "入力頼んま"}</>
        </div>
        <div className="form-div">
          <span className="form-title">simple content</span>
          <Controller
            control={control}
            name="contents"
            render={({ field }) => (
              <InputSimpleComponent
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="form-div">
          <span className="form-title">アクセス</span>
          <input className="form-input" {...register("access")} />
        </div>
        <div className="form-div">
          <span className="form-title">map</span>
          <input className="form-input" {...register("map")} />
        </div>

        <div className="form-div">
          <span className="form-title">価格帯</span>
          <div className="flex flex-row w-full items-center">
            <input
              className="form-input"
              type="number"
              {...register("price", { min: 0 })}
            />
            <span className="w-40">円以下</span>
          </div>
          <>
            {errors.price?.type == "min" &&
              "食べに行ってお金がもらえるそんな世界線にあこがれるっす"}
          </>
        </div>
        <div className="form-div">
          <span className="form-title">営業日</span>
          <Controller
            control={control}
            name="closingDay"
            render={({ field }) => (
              <InputHolidayComponet
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="form-div">
          <span className="form-title">営業時間</span>
          <Controller
            control={control}
            name="fromOpenToCleseTime"
            render={({ field }) => (
              <InputOpenCloseComponent
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="form-div">
          <span className="form-title">電話番号</span>
          <input
            className="form-input"
            {...register("phoneNumber", {
              pattern: /^0\d{9,10}$/,
            })}
          />
          <>
            {errors.phoneNumber?.type == "pattern" &&
              "本当に存在する電話番号ですか？ ハイフンは抜いて登録お願いします"}
          </>
        </div>
        <div className="form-div">
          <span className="form-title">Links</span>
          <Controller
            control={control}
            name="links"
            render={({ field }) => (
              <InputLinksComponent
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="form-div">
          <span className="form-title">お店のURL</span>
          <input
            className="form-input"
            {...register("ShopLink", { pattern: /https([^">]+)/g })}
          />
          <>{errors.ShopLink?.type == "pattern" && "無効なURLです"}</>
        </div>

        <div className="form-div">
          <span className="form-title">FreeTag</span>
          <Controller
            control={control}
            name="freeTag"
            rules={{
              validate: {
                minSelect: (value) => value?.length != 0,
              },
            }}
            render={({ field }) => (
              <InputTagDataComponent
                data={freeDataList}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <>
            {errors.freeTag?.type == "minSelect" &&
              "最低一つはタグに紐づけをお願いします"}
          </>
        </div>
        <div className="form-div">
          <span className="form-title">AreaTag</span>
          <Controller
            control={control}
            name="areaTag"
            rules={{
              validate: {
                minSelect: (value) => value?.length != 0,
                maxSelect: (value) => (value ? value.length < 3 : false),
              },
            }}
            render={({ field }) => (
              <InputTagDataComponent
                data={areaDataList}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <>
            {errors.areaTag?.type == "minSelect" &&
              "最低一つはタグに紐づけをお願いします"}
          </>
          <>
            {errors.areaTag?.type == "maxSelect" &&
              "付けられるタグは最大二つです"}
          </>
        </div>
        <div className="form-div">
          <span className="form-title">画像集</span>
          <Controller
            control={control}
            name="photoData"
            render={({ field }) => (
              <InputPhotoDataComponent
                value={field.value}
                onChange={field.onChange}
                data={imageDataList}
              />
            )}
          />
        </div>

        <input
          className="form-input bg-blue-400 text-white"
          type="submit"
          value={editFlag ? "編集" : "送信"}
        />
      </form>
      <div className="px-5">
        {editFlag ? (
          <button
            className="form-input bg-red-400 text-white"
            onClick={onSubmitDelete}
          >
            削除
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
