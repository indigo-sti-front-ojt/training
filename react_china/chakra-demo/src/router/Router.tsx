import { memo,FC } from "react";
import{ Routes , Route } from "react-router-dom"

import { Login } from "../components/pages/Login"
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManegement";
import { Home } from "../components/pages/Home"

export const Router:FC = memo(() =>{
  return(
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/usermanegement" element={<UserManagement />} />
      </Routes>
  )
});