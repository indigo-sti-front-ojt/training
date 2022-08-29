import React, { useEffect, useState } from "react";

type Props = {
  mapData?: string;
};
export const IFrameComponent = (props: Props) => {
  const { mapData } = props;
  const [URL, setURL] = useState<string>("");
  const [view, setView] = useState<boolean>(false);

  useEffect(() => {
    const pattern = /https([^">]+)/g;
    if (mapData) {
      mapData.match(pattern)?.forEach((value: string) => {
        setURL(value);
        setView(true);
      });
    }
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center rounded-2xl relative bg-gray-400/20">
      {view ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          loading="lazy"
          src={URL}
        />
      ) : (
        <span>データがありません</span>
      )}
    </div>
  );
};
