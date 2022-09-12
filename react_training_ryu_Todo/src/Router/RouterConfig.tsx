import React, { Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useTodoData } from "../Hooks/TodoData";
import { TodoContainer } from "../Providers/TodoList";
import { Layout } from "../Views/Layout/Layout";
import { HomePage } from "../Views/Pages/HomePage";
import { ListTodoPage } from "../Views/Pages/ListTodoPage";
import { NotFound } from "../Views/Pages/NotFound";
import { TodoPage } from "../Views/Pages/TodoPage";

import { CircularProgress } from "@mui/material";

export const RouterConfig = () => {
  const { readDataTags } = useTodoData();

  const { load, setLoad, setTags } = TodoContainer.useContainer();
  const RouterThings = () => {
    if (!load) {
      throw readDataTags().then((value: string[]) => {
        setTags(value);
        setLoad(true);
      });
    }
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="listTodo"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route index element={<ListTodoPage />} />
              <Route path=":tagName" element={<TodoPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </>
    );
  };
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<CircularProgress />}>
          <RouterThings />
        </Suspense>
      </BrowserRouter>
    </>
  );
};
