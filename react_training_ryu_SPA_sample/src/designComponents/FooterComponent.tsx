import React from "react";
import { useLocation } from "react-router-dom";
import footerImage from "../images/footerImage.png";

export const FooterComponet = () => {
  const location = useLocation();

  return (
    <>
      <footer
        className={
          "mt-20 w-full border-t-4 border-gray-700 flex justify-center items-center" +
          (location.pathname.includes("owner") ? " hidden" : "")
        }
      >
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="w-full md:w-1/4">
            <img src={footerImage} alt="" />
          </div>
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start gap-4">
            <span className="text-2xl">logo</span>
            <div className="w-full flex flex-row justify-center items-center gap-4">
              <span>link</span>
              <span>link</span>
              <span>link</span>
            </div>
            <div>コンタクト</div>
          </div>
        </div>
      </footer>
    </>
  );
};
