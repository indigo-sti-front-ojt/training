import React, { useEffect, useState } from "react";
import { TagDBType } from "../types/TagDBType";

type Props = {
  data: TagDBType;
};

export const CardTagComponent = (props: Props) => {
  const { data } = props;
  const [color, setColor] = useState<string>("tag-black");
  useEffect(() => {
    if (data.color) {
      switch (data.color) {
        case "black":
          setColor("tag-black");
          break;
        case "white":
          setColor("tag-white");
          break;
        case "orange":
          setColor("tag-orange");
          break;
        case "blue":
          setColor("tag-blue");
          break;
        case "red":
          setColor("tag-red");
          break;
      }
    }
  }, [data]);
  return (
    <>
      <span className={"card-tag " + color}>{data.text}</span>
    </>
  );
};
