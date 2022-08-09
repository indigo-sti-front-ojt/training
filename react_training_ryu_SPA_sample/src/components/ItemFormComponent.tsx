import React, { useEffect } from "react";
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
import { TagDBContainer } from "../provider/TagDBProvider";
import { ShopDBType } from "../types/ShopDBType";
import { InputHolidayComponet } from "./InputHolidayComponent";
import { InputLinksComponent } from "./InputLinksComponent";
import { InputOpenCloseComponent } from "./InputOpenCloseComponent";
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

  const onSubmit: SubmitHandler<ShopDBType> = (formData: ShopDBType) => {
    if (editFlag && data?.uid && onClickEditData) {
      // edit
      const temp: ShopDBType = {
        uid: data.uid,
        name: formData.name ?? "",
        title: formData.title ?? "",
        mainImage: formData.mainImage ?? "",
        access: formData.access ?? "",
        map: formData.map ?? "",
        price: formData.price ?? "",
        closingDay: formData.closingDay ?? [],
        fromOpenToCleseTime: formData.fromOpenToCleseTime ?? {
          open: "00:00",
          close: "00:00",
        },
        phoneNumber: formData.phoneNumber ?? "",
        links: formData.links ?? [],
        ShopLink: formData.ShopLink ?? "",
        photoData: formData.photoData ?? [],
        contents: formData.contents ?? [],
        areaTag: formData.areaTag ?? [],
        freeTag: formData.freeTag ?? [],
        writer: data.writer,
      };
      onClickEditData(temp);
    } else {
      // create
      if (onClickSendData) {
        if (data != undefined) {
          const temp: ShopDBType = {
            uid: "",
            name: formData.name ?? "",
            title: formData.title ?? "",
            mainImage: formData.mainImage ?? "",
            access: formData.access ?? "",
            map: formData.map ?? "",
            price: formData.price ?? "",
            closingDay: formData.closingDay ?? [],
            fromOpenToCleseTime: formData.fromOpenToCleseTime ?? {
              open: "00:00",
              close: "00:00",
            },
            phoneNumber: formData.phoneNumber ?? "",
            links: formData.links ?? [],
            ShopLink: formData.ShopLink ?? "",
            photoData: formData.photoData ?? [],
            contents: formData.contents ?? [],
            areaTag: formData.areaTag ?? [],
            freeTag: formData.freeTag ?? [],
            writer: data.writer,
          };
          onClickSendData(temp);
        }
      }
    }
  };
  const onSubmitDelete = () => {
    if (onClickDeleteData) {
      onClickDeleteData();
    }
  };

  useEffect(() => {
    if (data != undefined && editFlag) {
      setValue("name", data.name);
      setValue("title", data.title);
      setValue("mainImage", data.mainImage);
      setValue("contents", data?.contents);
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
    }
  }, [data]);
  return (
    <>
      <div>itemcomponent</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span>title</span>
          <input {...register("title", { required: true })} />
          <>{errors.title?.type == "required" && "入力頼んま"}</>
        </div>
        <div>
          <span>mainImage</span>
          <input {...register("mainImage", { required: true })} />
          <>{errors.mainImage?.type == "required" && "入力頼んま"}</>
        </div>
        <div>
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
          <span>map</span>
          <input {...register("map")} />
        </div>

        <div>
          <span>価格帯</span>
          <input {...register("price")} />
          <span>円以下</span>
        </div>
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
        <div>
          <span>電話番号</span>
          <input {...register("phoneNumber")} />
        </div>
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
        <div>
          <span>お店のURL</span>
          <input {...register("ShopLink")} />
        </div>
        <div>
          <span>Google map</span>
          <input {...register("map")} />
        </div>
        <Controller
          control={control}
          name="photoData"
          render={({ field }) => (
            <InputPhotoDataComponent
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {/* contentsComponent */}
        <Controller
          control={control}
          name="freeTag"
          render={({ field }) => (
            <InputTagDataComponent
              data={freeDataList}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="areaTag"
          render={({ field }) => (
            <InputTagDataComponent
              data={areaDataList}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {editFlag ? (
          <input type="submit" value="編集" />
        ) : (
          <input type="submit" value="送信" />
        )}
      </form>
      {editFlag ? <button onClick={onSubmitDelete}>削除</button> : ""}
    </>
  );
};
