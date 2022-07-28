import React, { useState } from "react";
import { InputHolidayComponet } from "../components/InputHolidayComponent";
export const TestComponentView = () => {
  const [closingDay, setClosingday] = useState<number[]>([0, 4]);

  return (
    <>
      <div>test view</div>
      <div>
        <InputHolidayComponet target={closingDay} setTarget={setClosingday} />
      </div>
    </>
  );
};
