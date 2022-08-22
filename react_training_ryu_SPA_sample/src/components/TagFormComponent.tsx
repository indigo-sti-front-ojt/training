import React, { memo, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TagDBType } from "../types/TagDBType";
import { InputColorsComponent } from "./InputColorsComponet";

type Props = {
  data: TagDBType;
  sendDataAdd: (data: TagDBType) => void;
  sendDataEdit: (data: TagDBType) => void;
  sendDataDelete: (data: TagDBType) => void;
  setVisibleFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TagFormComponent = (props: Props) => {
  const { data, sendDataAdd, sendDataEdit, sendDataDelete, setVisibleFlag } =
    props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<{
    text: string;
    color: string;
  }>();

  const onSubmit: SubmitHandler<{
    text: string;
    color: string;
  }> = async (formData: { text: string; color: string }) => {
    console.log(formData);
    if (data.id != "") {
      await sendDataEdit({ ...formData, id: data.id });
    } else {
      await sendDataAdd({ ...formData, id: data.id });
    }
    setVisibleFlag(false);
  };
  const onDelete = () => {
    sendDataDelete(data);
    setVisibleFlag(false);
  };
  useEffect(() => {
    data.text != "" && data.text
      ? setValue("text", data.text)
      : setValue("text", "");

    data.color != "" && data.color
      ? setValue("color", data.color)
      : setValue("color", "black");
  }, [data]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">
          <input type="text" {...register("text")} />
        </label>
        <label htmlFor="">
          <Controller
            control={control}
            name={"color"}
            render={({ field }) => (
              <InputColorsComponent
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </label>
        <button>送信</button>
      </form>

      {data.id != "" ? <button onClick={onDelete}>削除</button> : "pay"}
    </>
  );
};
