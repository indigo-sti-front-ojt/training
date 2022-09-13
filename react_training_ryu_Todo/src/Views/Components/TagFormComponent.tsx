import { Alert, Box, Button, Input } from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TodoContainer } from "../../Providers/TodoList";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  addData: (tagName: string) => void;
};

type FormInput = {
  tagName: string;
};

export const TagFormComponent = (props: Props) => {
  const { tags } = TodoContainer.useContainer();

  const schema = yup
    .object({
      tagName: yup
        .string()
        .required("必ず入力をお願いします")
        .test("duplicated", "重複しています", (value: string | undefined) => {
          if (value) {
            console.log("check", tags.includes(value));
            return !tags.includes(value);
          }
          return false;
        }),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      tagName: "",
    },
    resolver: yupResolver(schema),
  });

  const [send, setSend] = useState<boolean>(false);

  const { addData } = props;

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    console.log(data);
    setSend(true);
    addData(data.tagName);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: "20px",
            width: "300px",
            height: "150px",
          }}
        >
          <Controller
            name="tagName"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.tagName ? (
            <Alert severity="error">
              <span>{errors.tagName?.message}</span>
            </Alert>
          ) : (
            <>
              {" "}
              <Alert severity="info">
                <span>重複した値は登録できません</span>
              </Alert>
            </>
          )}

          <Button type="submit" variant="contained" disabled={send}>
            送信
          </Button>
        </Box>
      </form>
    </>
  );
};
