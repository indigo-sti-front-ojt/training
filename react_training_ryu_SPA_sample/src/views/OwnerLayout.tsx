import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ListChildMapComponent } from "../components/ListChildMapComponent";
import { useAuthUser } from "../hocks/AuthUser";

export const OwnerLayout = () => {
  const { logout } = useAuthUser();
  const navigate = useNavigate();
  const ClickLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };
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
