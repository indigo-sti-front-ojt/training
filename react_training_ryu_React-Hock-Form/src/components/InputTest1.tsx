import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const GenderEnum = {
  female: "female",
  male: "male",
  other: "other",
};
type GenderEnum = typeof GenderEnum[keyof typeof GenderEnum];

type IFormInput = {
  firstName: string;
  gender: GenderEnum;
  lastName: string;
  age: number;
};

export const InputTest1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First Name
        <input
          {...register("firstName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
        />
        <>{errors.firstName?.type == "required" && "必須事項"}</>
        <>{errors.firstName?.type == "maxLength" && "文字数制限"}</>
        <>{errors.firstName?.type == "pattern" && "無効な文字列"}</>
      </label>
      <label>
        lastName
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      </label>
      <label>
        age
        <input type="number" {...register("age", { min: 18, max: 99 })} />
      </label>
      <label>
        Gender Selection
        <select {...register("gender")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
      </label>
      <input type="submit" />
    </form>
  );
};
