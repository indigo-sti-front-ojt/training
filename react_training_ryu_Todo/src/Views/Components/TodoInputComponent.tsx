import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/system";

type Props = {
  onClickAdd: (text: string, color: string) => void;
};

type FormInput = {
  text: string;
  color: string;
};

export const TodoInputComponent = (props: Props) => {
  const { onClickAdd } = props;

  const schema = yup
    .object({
      text: yup
        .string()
        .required("Todoの内容を記入してください")
        .test(
          "length",
          "文字数制限(7文字以下で入力をお願いします)",
          (value: string | undefined) => {
            if (value) return value.length < 8 ? true : false;
            return false;
          }
        ),
      color: yup.string().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    defaultValues: {
      text: "",
      color: "black",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    onClickAdd(data.text, data.color);
    console.log(data);
    reset();
  };
  //   react-hook-formとマテリアルUIの融合を試したい
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: "50%",
            minWidth: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {errors.text ? (
            <Alert severity="error" sx={{ width: "100%" }}>
              <span>{errors.text?.message}</span>
            </Alert>
          ) : (
            <>
              <Alert severity="info" sx={{ width: "100%" }}>
                <span>情報は自動で保存されないので適宜保存をお願いします</span>
              </Alert>
            </>
          )}
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ width: "48%", minWidth: "300px" }}
                label="text"
                placeholder="7文字以下"
                {...field}
              />
            )}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ width: "48%", minWidth: "300px" }}>
                <InputLabel id="area-label">color</InputLabel>
                <Select
                  labelId="area-label"
                  label="color" // フォーカスを外した時のラベルの部分これを指定しないとラベルとコントロール線が被る
                  {...field}
                >
                  <MenuItem value={"black"}>NORMAL</MenuItem>
                  <MenuItem value={"greeen"}>LEVEL.1</MenuItem>
                  <MenuItem value={"yellow"}>LEVEL.2</MenuItem>
                  <MenuItem value={"red"}>LEVEL.3</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Button variant="contained" sx={{ minWidth: "300px" }} type="submit">
            追加
          </Button>
        </Box>
      </form>
    </>
  );
};
