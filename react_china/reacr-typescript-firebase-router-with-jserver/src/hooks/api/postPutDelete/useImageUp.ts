import { useState } from "react";
import axios from "axios";

export const useImageUp = () => {
  const [icondata, setIcondata] = useState("");

  const onClickImageUp = async (tmpFile?: File) => {
    console.log(tmpFile);
    try {
      await axios({
        url: "/upload/image/",
        method: "post",
        data: tmpFile,
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const res = await axios.get("http://localhost:5000/image");
      setIcondata(res.data.url);
      // setValue({ formLabel }, icon_data?.url);
    } catch {
      console.log("error");
    }
  };
  return { onClickImageUp, icondata };
};
