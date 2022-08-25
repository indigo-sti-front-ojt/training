import React, { useLayoutEffect, useState } from "react";
import { ImagesDBType } from "../types/ImagesDBType";
import Mansory from "react-masonry-css";
import { ImageContainer } from "../provider/ImageProvider";

type Props = {
  imageData: string[] | undefined;
};
export const MansoryImageComponent = (props: Props) => {
  const { imageData } = props;
  const [imageViewData, setImageViewData] = useState<ImagesDBType[]>([]);
  const { imageDataList } = ImageContainer.useContainer();
  const breakpointColumnsObj = {
    default: 3,
    1350: 2,
    1048: 2,
    576: 1,
  };
  useLayoutEffect(() => {
    if (!imageDataList) return;
    const tempList: ImagesDBType[] = [];
    imageData?.forEach((value: string) => {
      const temp = imageDataList.find(
        (temp: ImagesDBType) => temp.uid == value
      );
      if (temp) tempList.push(temp);
    });
    setImageViewData(tempList);
  }, []);

  return (
    <div className="w-11/12 flex flex-col items-center gap-2">
      {imageData && imageViewData.length != 0 ? (
        <>
          <span className="flex-grow-0 w-full md:w-3/4 text-2xl border-b-2 border-gray-700">
            画像集
          </span>
          <Mansory
            breakpointCols={breakpointColumnsObj}
            className="w-full flex"
            columnClassName="my-masonry-grid_column"
          >
            {imageViewData.map((value: ImagesDBType) => (
              <img key={value.uid} src={value.url} alt="" />
            ))}
          </Mansory>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

{
  /* <Mansory
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {imageData.map((value: ImagesDBType) => (
          <img key={value.uid} src={value.url} alt="" />
        ))}
      </Mansory> */
}
