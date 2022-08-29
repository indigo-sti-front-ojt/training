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
              "fixed z-50 top-12 md:static md:flex justify-between items-center w-full h-full transition-all md:h-10 bg-gray-500/75 " +
              (open ? "  left-0" : " -left-full")
            }
          >
            <div className="h-full flex justify-center items-center">
              layout
            </div>
            <ul className="md:flex flex-row gap-4">
              <ListChildMapComponent>
                <Link
                  className={
                    "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname == "/" ? " bg-black" : "")
                  }
                  to="/"
                >
                  home
                </Link>
                <Link
                  className={
                    "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname == "/about" ? " bg-black" : "")
                  }
                  to="/about"
                >
                  about
                </Link>
                <Link
                  className={
                    "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname.includes("/pages") ? " bg-black" : "")
                  }
                  to="/pages"
                >
                  pages
                </Link>

                <Link
                  className={
                    "w-full h-8 rounded-xl text-white flex justify-center items-center px-8 border border-black transition ease-in-out " +
                    (location.pathname == "/login" ||
                    location.pathname.includes("owner")
                      ? " bg-black"
                      : "")
                  }
                  to="/login"
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
