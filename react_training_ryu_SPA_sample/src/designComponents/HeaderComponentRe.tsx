import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListChildMapComponent } from "../components/ListChildMapComponent";
import { useAuthUser } from "../hocks/AuthUser";

export const HeaderComponentRe = () => {
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
      {!location.pathname.includes("owner") ? (
        <>
          <header
            className={
              "z-20 fixed top-0 left-0 h-16 w-full flex flex-row justify-between items-center pl-2 bg-gray-600/50"
            }
          >
            <div className="w-full md:w-24 h-full flex justify-center items-center">
              layout
            </div>

            <div
              className={
                "z-40 absolute md:static top-0 left-0 w-screen h-screen md:w-auto md:h-full flex flex-col md:flex-row items-center justify-around gap-10 font-kosugi text-xl transition-transform " +
                (open
                  ? " translate-x-0"
                  : " -translate-x-full md:translate-x-0") +
                " bg-gray-400 md:bg-gray-600/50 px-10"
              }
            >
              <ListChildMapComponent>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className={
                    "px-4 py-2 hover:cursor-pointer overflow-hidden relative group transition-colors duration-300 hover:text-black" +
                    (location.pathname == "/"
                      ? " text-black"
                      : " text-gray-500")
                  }
                >
                  HOME
                  <span className="hidden md:block absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform duration-300 -translate-x-full group-hover:translate-x-0"></span>
                  <span className="hidden md:block absolute bottom-0 right-0 w-0.5 h-full bg-black transition-transform duration-300 translate-y-full group-hover:translate-y-0"></span>
                  <span className="hidden md:block absolute top-0 left-0 w-full h-0.5 bg-black transition-transform duration-300 translate-x-full group-hover:translate-x-0"></span>
                  <span className="hidden md:block absolute bottom-0 left-0 w-0.5 h-full bg-black transition-transform duration-300 -translate-y-full group-hover:translate-y-0"></span>
                </Link>
                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className={
                    "px-4 py-2 hover:cursor-pointer overflow-hidden relative group transition-colors duration-300 hover:text-black" +
                    (location.pathname == "/about"
                      ? " text-black"
                      : " text-gray-500")
                  }
                >
                  ABOUT
                  <span className="hidden md:block absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform duration-300 -translate-x-full group-hover:translate-x-0"></span>
                  <span className="hidden md:block absolute bottom-0 right-0 w-0.5 h-full bg-black transition-transform duration-300 translate-y-full group-hover:translate-y-0"></span>
                  <span className="hidden md:block absolute top-0 left-0 w-full h-0.5 bg-black transition-transform duration-300 translate-x-full group-hover:translate-x-0"></span>
                  <span className="hidden md:block absolute bottom-0 left-0 w-0.5 h-full bg-black transition-transform duration-300 -translate-y-full group-hover:translate-y-0"></span>
                </Link>
                <Link
                  to="/pages"
                  onClick={() => setOpen(false)}
                  className={
                    "px-4 py-2 hover:cursor-pointer overflow-hidden relative group transition-colors duration-300 hover:text-black" +
                    (location.pathname == "/pages"
                      ? " text-black"
                      : " text-gray-500")
                  }
                >
                  PAGES
                  <span className="hidden md:block absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform duration-300 -translate-x-full group-hover:translate-x-0"></span>
                  <span className="hidden md:block absolute bottom-0 right-0 w-0.5 h-full bg-black transition-transform duration-300 translate-y-full group-hover:translate-y-0"></span>
                  <span className="hidden md:block absolute top-0 left-0 w-full h-0.5 bg-black transition-transform duration-300 translate-x-full group-hover:translate-x-0"></span>
                  <span className="hidden md:block absolute bottom-0 left-0 w-0.5 h-full bg-black transition-transform duration-300 -translate-y-full group-hover:translate-y-0"></span>
                </Link>
              </ListChildMapComponent>
            </div>

            <div className="z-50 md:hidden fixed bottom-2.5 right-2.5 h-12 w-12 flex flex-col justify-center items-center gap-1 hover:gap-0 rounded-lg shadow-xl border-2 border-gray-600/40 bg-white">
              <Hamburger direction="right" toggled={open} toggle={setOpen} />
            </div>
          </header>
        </>
      ) : (
        <></>
      )}

      {!location.pathname.includes("owner") ? (
        <></>
      ) : (
        <>
          <header>
            <div
              className={
                "z-50 fixed transition-all " +
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
            </div>
            <div className="z-50 md:hidden fixed bottom-2.5 right-2.5 h-12 w-12 flex flex-col justify-center items-center gap-1 hover:gap-0 rounded-lg shadow-xl border-2 border-gray-600/40 bg-white">
              <Hamburger direction="right" toggled={open} toggle={setOpen} />
            </div>
          </header>
        </>
      )}
    </>
  );
};
