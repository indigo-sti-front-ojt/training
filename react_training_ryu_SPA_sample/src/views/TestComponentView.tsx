import React, { useState } from "react";
import { InputHolidayComponet } from "../components/InputHolidayComponent";
import { InputLinksComponent } from "../components/InputLinksComponent";
import { InputOpenCloseComponent } from "../components/InputOpenCloseComponent";
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
  return (
    <>
      <div>test view</div>
      <div>
        <InputHolidayComponet target={closingDay} setTarget={setClosingday} />
      </div>
      <div>
        <InputOpenCloseComponent
          target={fromOpenToCloseTime}
          setTarget={setFromOpenToCloseTime}
        />
      </div>
      <div>
        <InputLinksComponent target={links} setTarget={setLinks} />
      </div>
    </>
  );
};
