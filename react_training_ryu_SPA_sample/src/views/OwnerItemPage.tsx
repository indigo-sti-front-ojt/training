import React, { useLayoutEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PageItemComponent } from "../designComponents/PageItemComponent";
import { useShopDB } from "../hocks/ShopDB";
import { ShopDBContainer } from "../provider/ShopDBProvider";

export const OwnerItemPage = () => {
  const { id } = useParams();
  const { ShopDataRead } = useShopDB();
  const { shopData } = ShopDBContainer.useContainer();
  useLayoutEffect(() => {
    if (shopData.uid != id && shopData.uid == "") {
      ShopDataRead(id ?? "");
    }
  }, []);

  const navigation = useNavigate();
  const onClickLink = () => {
    navigation("edit");
  };
  return (
    <>
      {/* <Link to={"edit"}>edit</Link> */}

      <PageItemComponent data={shopData} />

      <div
        className="fixed w-10 h-10 md:w-20 md:h-20 right-0 bottom-0 m-2 bg-gray-300 rounded-full overflow-hidden"
        onClick={onClickLink}
      >
        <div className="w-full h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-10 md:w-10 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </div>

      <Outlet />
    </>
  );
};
