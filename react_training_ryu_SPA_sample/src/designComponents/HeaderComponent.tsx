import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListChildMapComponent } from "../components/ListChildMapComponent";

export const HeaderComponent = () => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {!location.pathname.includes("owner") ? (
        <>
          <header
            className={
              "z-50 fixed w-full bg-gray-400/50 md:hidden flex justify-end" +
              (location.pathname.includes("owner") ? " hidden" : "")
            }
          >
            <Hamburger direction="right" toggled={open} toggle={setOpen} />
          </header>
          <div
            className={
              "fixed flex flex-col z-50 top-12 md:static md:flex md:flex-row justify-between items-center w-screen pb-12 md:p-0 md:px-10 h-full md:h-14 flex-shrink-0 transition-all bg-gray-500/90 " +
              (open ? "  left-0" : " -left-full")
            }
          >
            <div className="h-40 md:h-full flex justify-center items-center">
              layout
            </div>
            <ul className="w-full flex flex-col justify-around items-center md:w-96 md:flex-row gap-4">
              <ListChildMapComponent>
                <Link
                  className={
                    "w-1/2 md:w-20 h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname == "/" ? " bg-black" : "")
                  }
                  to="/"
                  onClick={() => setOpen(false)}
                >
                  home
                </Link>
                <Link
                  className={
                    "w-1/2 md:w-20 h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname == "/about" ? " bg-black" : "")
                  }
                  to="/about"
                  onClick={() => setOpen(false)}
                >
                  about
                </Link>
                <Link
                  className={
                    "w-1/2 md:w-20 h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname.includes("/pages") ? " bg-black" : "")
                  }
                  to="/pages"
                  onClick={() => setOpen(false)}
                >
                  pages
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
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
