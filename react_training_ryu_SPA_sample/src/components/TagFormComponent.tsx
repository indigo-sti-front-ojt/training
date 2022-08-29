import React, { useEffect } from "react";
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

type tagFormType = {
  text: string;
  color: string;
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
  } = useForm<tagFormType>();

  const onSubmit: SubmitHandler<tagFormType> = async (
    formData: tagFormType
  ) => {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow max-w-lg gap-10"
      >
        <div className="flex flex-col gap-5">
          <label className="flex flex-col md:flex-row gap-2">
            <span className="form-title">テキスト</span>
            <input type="text" {...register("text")} className="form-input" />
          </label>
          <label className="flex flex-col md:flex-row gap-2">
            <span className="form-title">カラー</span>
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
        </div>
        <button className="form-input bg-blue-400 text-white">送信</button>
      </form>

      {data.id != "" ? (
        <button
          onClick={onDelete}
          className="form-input bg-red-400 text-white flex-grow max-w-lg"
        >
          削除
        </button>
      ) : (
        ""
      )}
    </>
  );
};
