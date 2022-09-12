import React, { Suspense } from "react";
import { Outlet } from "react-router";
import { HeaderComponent } from "../Components/HeaderComponent";

export const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Suspense fallback={<p>parent..</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
