import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type IFormInput = {
  firstName: string;
  gender: string;
  lastName: string;
  age: number;
};

export const InputTest3 = () => {
  const FormSchema = yup.object().shape({
    firstName: yup
      .string()
      .required()
      .max(20)
      .matches(/^[A-Za-z]+$/i),
    gender: yup.string().matches(/^[A-Za-z]+$/i),
    lastName: yup
      .string()
      .required()
      .max(20)
      .matches(/^[A-Za-z]+$/i),
    age: yup.number().required().max(99).min(20),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      firstName: "name",
      lastName: "male",
      gender: "male",
      age: 23,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) =>
    console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First Name
        <input {...register("firstName")} />
        <>{errors.firstName?.type == "required" && "必須事項"}</>
        <>{errors.firstName?.type == "max" && "文字数制限"}</>
        <>{errors.firstName?.type == "matches" && "無効な文字列"}</>
      </label>
      <label>
        lastName
        <input {...register("lastName")} />
        <>{errors.lastName?.type == "required" && "必須事項"}</>
        <>{errors.lastName?.type == "max" && "文字数制限"}</>
        <>{errors.lastName?.type == "matches" && "無効な文字列"}</>
      </label>
      <label>
        age
        <input type="number" {...register("age")} />
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
