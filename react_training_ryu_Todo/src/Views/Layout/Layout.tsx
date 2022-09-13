import React, { Suspense } from "react";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <main>
        <Suspense fallback={<p>parent..</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
