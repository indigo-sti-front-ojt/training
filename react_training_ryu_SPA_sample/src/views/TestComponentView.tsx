import React, { useState } from "react";
import { InputHolidayComponet } from "../components/InputHolidayComponent";
import { InputLinksComponent } from "../components/InputLinksComponent";
import { InputOpenCloseComponent } from "../components/InputOpenCloseComponent";
import { InputPhotoDataComponent } from "../components/InputPhotoDataComponent";
// import { TagFormComponent } from "../components/TagFormComponent";
import { TagTextObject } from "../types/TagTextObject";
export const TestComponentView = () => {
  const [closingDay, setClosingday] = useState<number[]>([0, 4]);
  const [fromOpenToCloseTime, setFromOpenToCloseTime] = useState<{
    open: string;
    close: string;
  }>({ open: "01:00", close: "20:00" });

  const [links, setLinks] = useState<TagTextObject[]>([
    { tag: "食べログ", text: "aaaaa" },
  ]);
  const [photoData, setPhotoData] = useState<string[]>(["aaaa"]);
  return (
    <>
      <div>test view</div>
      <div>
        {/* <InputHolidayComponet target={closingDay} setTarget={setClosingday} /> */}
      </div>
      <div>
        {/* <InputOpenCloseComponent
          target={fromOpenToCloseTime}
          setTarget={setFromOpenToCloseTime}
        /> */}
      </div>
      <div>
        {/* <InputLinksComponent target={links} setTarget={setLinks} /> */}
      </div>
      <div>
        {/* <InputPhotoDataComponent target={photoData} setTarget={setPhotoData} /> */}
      </div>
      <div>{/* <TagFormComponent /> */}</div>
    </>
  );
};
