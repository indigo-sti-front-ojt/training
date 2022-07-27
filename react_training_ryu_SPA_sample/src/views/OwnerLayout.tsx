import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ListChildMapComponent } from "../components/ListChildMapComponent";
import { useAuthUser } from "../hocks/AuthUser";
import { useShopDB } from "../hocks/ShopDB";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { ShopDBContainer } from "../provider/ShopDBProvider";

export const OwnerLayout = () => {
  const { logout } = useAuthUser();
  const { user } = AuthUserContainer.useContainer();
  const { changeFlag } = ShopDBContainer.useContainer();
  const navigate = useNavigate();

  const ClickLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const { ShopDataReads_AfterLogin } = useShopDB();
  useEffect(() => {
    ShopDataReads_AfterLogin(user.uid);
  }, [changeFlag]);

  return (
    <>
      <div>ownerlayout</div>
      <div>
        <button onClick={ClickLogout}>logout</button>
      </div>
      <ul>
        <ListChildMapComponent>
          <Link to="user">user</Link>
          <Link to="pages">pages</Link>
          <Link to="tags">tags</Link>
        </ListChildMapComponent>
      </ul>
      <Outlet />
    </>
  );
};
