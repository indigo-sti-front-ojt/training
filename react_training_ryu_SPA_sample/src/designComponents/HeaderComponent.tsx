import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListChildMapComponent } from "../components/ListChildMapComponent";
import { useAuthUser } from "../hocks/AuthUser";

export const HeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthUser();
  const [open, setOpen] = useState<boolean>(false);

  const ClickLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/", { replace: true });
  };
  return (
    <>
      <header
        className={
          "z-50 fixed h-12 w-full bg-gray-400/50 md:hidden flex items-center justify-between"
        }
      >
        <div>layout</div>
        <Hamburger direction="right" toggled={open} toggle={setOpen} />
      </header>
      {!location.pathname.includes("owner") ? (
        <>
          <header
            className={
              "z-50 fixed top-12 md:static transition-all " +
              (open ? "left-0 " : " -left-full ") +
              "h-full w-full md:h-16 " +
              "flex flex-col md:flex-row justify-around md:justify-between items-center " +
              "bg-red-600 border-b-2 border-gray-700/50  pb-12 md:p-0 md:px-10 mb-2"
            }
          >
            <div className="flex flex-col flex-wrap justify-center">layout</div>
            <ul className="flex flex-col md:flex-row justify-center items-center gap-2">
              <ListChildMapComponent>
                <Link
                  className={
                    "w-1/2 md:w-20 h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname == "/" ? " bg-black" : "")
                  }
                  to="/"
                  onClick={() => setOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  className={
                    "w-1/2 md:w-20 h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname == "/about" ? " bg-black" : "")
                  }
                  to="/about"
                  onClick={() => setOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  className={
                    "w-1/2 md:w-20 h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname.includes("/pages") ? " bg-black" : "")
                  }
                  to="/pages"
                  onClick={() => setOpen(false)}
                >
                  PAGES
                </Link>
                <Link
                  className={
                    "w-1/2 md:w-20 h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname == "/login" ||
                    location.pathname.includes("owner")
                      ? " bg-black"
                      : "")
                  }
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  login
                </Link>
              </ListChildMapComponent>
            </ul>
          </header>
        </>
      ) : (
        <>
          <header
            className={
              "z-50 fixed top-10 md:top-0 md:left-0 transition-all " +
              (open
                ? "translate-x-0 "
                : "-translate-x-full md:translate-x-0 ") +
              "w-screen h-screen md:w-11 md:hover:w-40 md:h-screen md:overflow-x-hidden " +
              "flex flex-col justify-center md:justify-end items-center md:items-start gap-y-10 " +
              "bg-gray-500  "
            }
          >
            <ul className="flex flex-col flex-wrap gap-2">
              <ListChildMapComponent>
                <Link
                  to="/owner"
                  className="flex gap-2 items-center"
                  onClick={() => setOpen(false)}
                >
                  <div className="h-9 w-9 mx-1 rounded-md bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span>user</span>
                </Link>
                <Link
                  to="/owner/pages"
                  className="flex gap-2 items-center"
                  onClick={() => setOpen(false)}
                >
                  <div className="h-9 w-9 mx-1 rounded-md bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span>pages</span>
                </Link>
                <Link
                  to="/owner/tags"
                  className="flex gap-2 items-center"
                  onClick={() => setOpen(false)}
                >
                  <div className="h-9 w-9 mx-1 rounded-md bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <span>tags</span>
                </Link>
                <Link
                  to="/owner/images"
                  className="flex gap-2 items-center"
                  onClick={() => setOpen(false)}
                >
                  <div className="h-9 w-9 mx-1 rounded-md bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>images</span>
                </Link>
              </ListChildMapComponent>
            </ul>
            <ul className="flex flex-col gap-2">
              <ListChildMapComponent>
                <Link
                  to="/"
                  className="flex gap-2 items-center"
                  onClick={() => setOpen(false)}
                >
                  <div className="h-9 w-9 mx-1 rounded-md bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span>home</span>
                </Link>
                <li
                  className="flex gap-2 items-center hover:cursor-pointer"
                  onClick={ClickLogout}
                >
                  <div className="h-9 w-9 mx-1 rounded-md bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span>logout</span>
                </li>
              </ListChildMapComponent>
            </ul>
          </header>
        </>
      )}
    </>
  );
};
