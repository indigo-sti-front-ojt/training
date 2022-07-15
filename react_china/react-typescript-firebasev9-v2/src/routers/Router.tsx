import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Signup } from "../pages/Signup";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
