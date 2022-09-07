import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { FooterComponet } from "../designComponents/FooterComponent";
import { HeaderComponent } from "../designComponents/HeaderComponent";
import { LodingContainer } from "../provider/LoadingProvider";

export const Layout = () => {
  const { loading } = LodingContainer.useContainer();

  const location = useLocation();

  return (
    <>
      <HeaderComponent />
      <main
        className={
          "flex flex-col gap-16 m-auto pt-12 md:pt-0 items-center w-full max-w-4xl" +
          (location.pathname.includes("owner") ? " md:pl-11" : " ")
        }
      >
        <Outlet />
      </main>
      <FooterComponet />
      {loading ? (
        <div className="fixed bg-gray-500/50 w-full h-full flex justify-center items-center">
          <div className="animate-spin h-20 w-20 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
