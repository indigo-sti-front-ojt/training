import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ItemFormComponent } from "../components/ItemFormComponent";
import { useShopDB } from "../hocks/ShopDB";
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { ShopDBType } from "../types/ShopDBType";

export const OwnerItemEditPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ShopDBType>();

  const { shopData } = ShopDBContainer.useContainer();
  const { ShopDataDelete, ShopDataEdit } = useShopDB();
  const [ViewShopData, setViewShopData] = useState<ShopDBType>();

  const navigate = useNavigate();

  useEffect(() => {
    if (shopData.uid == "") navigate("/owner/pages", { replace: true });
    setViewShopData(shopData);
  }, []);

  const onClickSendData = (temp: ShopDBType) => {
    ShopDataEdit(temp);
    navigate("/owner/pages", { replace: true });
  };
  const onClickDeleteData = () => {
    if (shopData.uid) {
      ShopDataDelete(shopData.uid);
      navigate("/owner/pages", { replace: true });
    }
  };
  return (
    <>
      <div>edit</div>
      <ItemFormComponent
        data={ViewShopData}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        control={control}
        onClickDeleteData={onClickDeleteData}
        onClickEditData={onClickSendData}
        editFlag={true}
      />
    </>
  );
};
