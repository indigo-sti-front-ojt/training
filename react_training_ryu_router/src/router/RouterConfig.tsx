import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Child1 } from "../components/Child1";
import { Child2 } from "../components/Child2";
import { Layout } from "../views/Layout";
import { NotFound } from "../views/NotFound";
import { Page1 } from "../views/Page1";
import { Page2 } from "../views/Page2";

export const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/page1" element={<Page1 />}></Route>
            <Route path="/page2" element={<Page2 />}>
              <Route path="child1" element={<Child1 />}></Route>
              <Route path="child2" element={<Child2 />}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
