import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ItemFormComponent } from "../components/ItemFormComponent";
import { useShopDB } from "../hocks/ShopDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { ShopDBType } from "../types/ShopDBType";
export const OwnerItemCreatePage = () => {
  const { ShopDataCreate } = useShopDB();
  const { user } = AuthUserContainer.useContainer();

  const navigate = useNavigate();
  const initializeShopData: ShopDBType = {
    uid: "",
    title: "",
    mainImage: "",
    name: "",
    access: "",
    map: "",
    price: "",
    closingDay: [],
    fromOpenToCleseTime: {
      open: "",
      close: "",
    },
    phoneNumber: "",
    ShopLink: "",
    photoData: [],
    links: [],
    contents: [],
    areaTag: [],
    freeTag: [],
    writer: user.uid,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ShopDBType>();
  const onClickSendData = (temp: ShopDBType) => {
    ShopDataCreate(temp);
    navigate("/owner/pages", { replace: true });
  };

  return (
    <>
      <div>create</div>
      <ItemFormComponent
        data={initializeShopData}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        control={control}
        onClickSendData={onClickSendData}
        editFlag={false}
      />
    </>
  );
};
