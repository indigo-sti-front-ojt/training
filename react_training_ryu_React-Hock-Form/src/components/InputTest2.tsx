import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Child } from "./Child";

export interface IFormValues {
  "First Name": string;
  Age: number;
}

export const InputTest2 = () => {
  const { register, handleSubmit } = useForm<IFormValues>();
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Child label="First Name" register={register} required />
        <Child label="Age" register={register} required={false} />
        <input type="submit" />
      </form>
    </>
  );
};
