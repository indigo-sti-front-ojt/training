import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "../Views/Layout/Layout";
import { CreateTodo } from "../Views/Pages/CreateTodo";
import { HomePage } from "../Views/Pages/HomePage";
import { ListTodoPage } from "../Views/Pages/ListTodoPage";
import { NotFound } from "../Views/Pages/NotFound";
import { TodoPage } from "../Views/Pages/TodoPage";

export const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
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
            <Route path="createTodo" element={<CreateTodo />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
