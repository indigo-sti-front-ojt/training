import React from "react";

type Props = {
  url: string;
  title: string;
  content: JSX.Element;
};
export const TopCardCompoent = (props: Props) => {
  const { url, title, content } = props;
  return (
    <>
      <div className="w-72 h-auto md:w-full flex flex-col md:flex-row items-center rounded-md shadow-lg p-4">
        <div className="w-full h-60 md:w-1/2">
          <img src={url} className="w-full h-full object-contain" alt="" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-5">
          <span className="text-2xl font-bold">{title}</span>
          <span className="text-lg text-left whitespace-pre-wrap">
            {content}
          </span>
        </div>
      </div>
    </>
  );
};
