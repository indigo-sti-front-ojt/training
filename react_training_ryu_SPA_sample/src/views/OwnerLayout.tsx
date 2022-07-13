import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
        <li>
          <Link to="user">user</Link>
        </li>
        <li>
          <Link to="pages">pages</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
