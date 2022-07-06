import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Child1 } from "../components/Child1";
import { Child2 } from "../components/Child2";
import { Layout } from "../views/Layout";
import { NotFound } from "../views/NotFound";
import { Page1 } from "../views/Page1";
import { Page2 } from "../views/Page2";
import { Page3 } from "../views/Page3";
import { RouteAuthGate } from "./RouteAuthGate";

export const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/page1" element={<Page1 />}></Route>
            <Route path="/page2" element={<Page2 />}>
              <Route
                path="child1"
                element={<RouteAuthGate component={<Child1 />} redirect="/" />}
              />
              <Route
                path="child2"
                element={<RouteAuthGate component={<Child2 />} redirect="/" />}
              />
            </Route>
            <Route path="/page3" element={<Page3 />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
