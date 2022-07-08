import { memo, FC } from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManegement";
import { Home } from "../components/pages/Home";
import { Layout } from "../layout/Layout";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: FC = memo(() => {
  return (
    <LoginUserProvider>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Layout />}>
          <Route
            index
            element={
              <HeaderLayout>
                <Home />
              </HeaderLayout>
            }
          />
          <Route
            path="setting"
            element={
              <HeaderLayout>
                <Setting />
              </HeaderLayout>
            }
          />
          <Route
            path="usermanegement"
            element={
              <HeaderLayout>
                <UserManagement />
              </HeaderLayout>
            }
          />
        </Route>
        <Route path="*" element={<Page404 />} />
    </Routes>
    </LoginUserProvider>
  );
});
