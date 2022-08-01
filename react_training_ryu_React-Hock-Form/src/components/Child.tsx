import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "./InputTest2";

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

export const Child = ({ label, register, required }: InputProps) => {
  return (
    <label>
      {label}
      <input {...register(label, { required })} />
    </label>
  );
};
