import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { PageItemComponent } from "../designComponents/PageItemComponent";
import { useShopDB } from "../hocks/ShopDB";
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { NotFoundPage } from "./NotFoundPage";

export const ItemPage = () => {
  const { id } = useParams();

  const { ShopDataRead } = useShopDB();
  const { shopData } = ShopDBContainer.useContainer();

  const ViewPageItem = () => {
    if (shopData.uid != id && shopData.uid == "" && id) {
      throw ShopDataRead(id);
    }
    return (
      <>
        {shopData.writer ? (
          <PageItemComponent data={shopData} />
        ) : (
          <NotFoundPage />
        )}
      </>
    );
  };

  return (
    <>
      <Suspense fallback={<p>wait......</p>}>
        <ViewPageItem />
      </Suspense>
    </>
  );
};
