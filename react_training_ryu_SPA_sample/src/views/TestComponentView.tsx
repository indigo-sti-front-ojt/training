import React, { useState } from "react";
import { InputHolidayComponet } from "../components/InputHolidayComponent";
import { InputOpenCloseComponent } from "../components/InputOpenCloseComponent";
export const TestComponentView = () => {
  const [closingDay, setClosingday] = useState<number[]>([0, 4]);
  const [fromOpenToCloseTime, setFromOpenToCloseTime] = useState<{
    open: string;
    close: string;
  }>({ open: "01:00", close: "20:00" });
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
    </>
  );
};
