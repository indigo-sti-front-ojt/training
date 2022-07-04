import { memo,FC } from "react";
import{ Routes , Route } from "react-router-dom"

import { Login } from "../components/pages/Login"
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManegement";
import { Home } from "../components/pages/Home";
import { Layout } from "../components/layout/Layout";

export const Router:FC = memo(() =>{
  return(
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="setting" element={<Setting />} />
            <Route path="usermanegement" element={<UserManagement />} />
          </Route>
      </Routes>
  )
});