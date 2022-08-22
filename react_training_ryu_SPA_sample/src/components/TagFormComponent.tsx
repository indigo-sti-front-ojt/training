import React, { memo, useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { TagDBType } from "../types/TagDBType";
import { InputColorsComponent } from "./InputColorsComponet";

type Props = {
  data: TagDBType[];
  sendData: (data: TagDBType[]) => void;
  setVisibleFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TagFormComponent = memo((props: Props) => {
  const { data, sendData, setVisibleFlag } = props;
  const { register, control, handleSubmit, reset } = useForm<{
    tag: { text: string; color: string }[];
  }>({
    defaultValues: { tag: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tag",
  });

  const onSubmit: SubmitHandler<{
    tag: { text: string; color: string }[];
  }> = (formData: { tag: { text: string; color: string }[] }) => {
    const tempList = formData.tag.map(
      (temp: { text: string; color: string }, index) => {
        return { id: index, text: temp.text, color: temp.color };
      }
    );
    console.log("send data");

    sendData(tempList);
    setVisibleFlag(false);
  };
  const onPlus = () => {
    append({ text: "", color: "" });
  };

  const onRemove = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    const tempList = data.map((temp: TagDBType) => {
      return { text: temp.text, color: temp.color };
    });
    // console.log(tempList);
    reset({ tag: tempList });
  }, [data]);

  return (
    <>
      <div className="flex h-20 w-full justify-center items-center">
        <div
          className="py-2 px-8 mx-2 rounded-md border border-black md:hover:cursor-pointer"
          onClick={onPlus}
        >
          追加
        </div>
      </div>
      <form
        className="flex-grow overflow-y-scroll flex flex-col items-center gap-10 md:gap-2 p-4 md:pr-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col md:flex-row items-center gap-2 w-3/4"
          >
            <input
              type="text"
              placeholder="text input"
              className="w-full p-2 border-2 border-gray-500 rounded-md"
              {...register(`tag.${index}.text`)}
            />
            <Controller
              control={control}
              name={`tag.${index}.color`}
              render={({ field }) => (
                <InputColorsComponent
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div
              className="flex flex-row items-center justify-around border-2 border-gray-400 p-2 rounded-md md:rounded-full md:hover:bg-gray-500 md:hover:text-white md:hover:cursor-pointer"
              onClick={() => onRemove(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="md:hidden">DELETE</span>
            </div>
          </div>
        ))}
        <input
          className="w-1/2 max-w-sm py-2 px-8 mx-2 rounded-md border border-black md:hover:cursor-pointer"
          type="submit"
          value="送信"
        />
      </form>
    </>
  );
});

TagFormComponent.displayName = "TagFormComponent";
