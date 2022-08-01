import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Child } from "./Child";

export type IFormValues = {
  FirstName: string;
  Age: number;
};

export const InputTest2 = () => {
  const { register, handleSubmit } = useForm<IFormValues>();
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Child label="FirstName" register={register} required />
        <Child label="Age" register={register} required={false} />
        <input type="submit" />
      </form>
    </>
  );
};
