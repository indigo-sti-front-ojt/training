import { Timestamp } from "firebase/firestore";
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
    writer: user.uid,
    createDate: Timestamp.now(),
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
      <div className="w-full h-16 flex justify-center items-center">
        <span className="text-2xl border-b-2 border-black px-20">
          ページ作成画面
        </span>
      </div>
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
