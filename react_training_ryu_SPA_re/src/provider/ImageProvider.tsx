import { useState } from "react";
import { createContainer } from "unstated-next";
import { ImagesDBType } from "../types/ImagesDBType";

const useImageContainer = () => {
  const [imageChangeFlag, setImageChangeFlag] = useState<boolean>(false);
  const [imageDataList, setImageDataList] = useState<ImagesDBType[]>([]);
  const [imageEditFlag, setImageEditFlag] = useState<boolean>(false);
  return {
    imageChangeFlag,
    setImageChangeFlag,
    imageEditFlag,
    setImageEditFlag,
    imageDataList,
    setImageDataList,
  };
};

export const ImageContainer = createContainer(useImageContainer);
