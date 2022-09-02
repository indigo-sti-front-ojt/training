import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const InputTest4 = () => {
  const initialDate = new Date();
  const [startDate, setStartDate] = useState(initialDate);
  const handleChange = (date: Date) => {
    setStartDate(date);
  };

  return <DatePicker selected={startDate} onChange={handleChange} />;
};
