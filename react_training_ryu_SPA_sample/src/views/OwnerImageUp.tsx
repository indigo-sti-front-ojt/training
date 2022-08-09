import React, { useState } from "react";
import { useImage } from "../hocks/Image";
import { v4 } from "uuid";
import { ImageContainer } from "../provider/ImageProvider";
import { ImagesDBType } from "../types/ImagesDBType";
export const OwnerImageUp = () => {
  const { imageDataList } = ImageContainer.useContainer();
  const { imageUpload, imageDelete } = useImage();
  const [imageData, setImageData] = useState<File>();

  const buttonImageUp = async () => {
    if (!imageData) return;
    if (!imageData.name) return;
    const result = await imageUpload(imageData.name + v4(), imageData);
    console.log(result);
  };
  const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files ? setImageData(event.target.files[0]) : "";
  };
  const onClickDelete = async (data: ImagesDBType) => {
    console.log(data);
    const result = await imageDelete(data);
    console.log(result);
  };

  return (
    <>
      <div>image up load</div>
      <input type="file" onChange={onChangeEvent} />
      <button onClick={buttonImageUp}>upload image</button>

      <div>
        {imageDataList.map((data) => (
          <div key={data.uid}>
            {data.fullPath}
            <img src={data.url} width="100" alt="" />
            <button onClick={() => onClickDelete(data)}>削除</button>
          </div>
        ))}
      </div>
    </>
  );
};
