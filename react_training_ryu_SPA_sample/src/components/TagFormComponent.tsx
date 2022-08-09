import React, { memo, useEffect } from "react";
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
    sendData(tempList);
    setVisibleFlag(false);
  };
  const onPlus = () => {
    append({ text: "", color: "" });
  };

  useEffect(() => {
    const tempList = data.map((temp: TagDBType) => {
      return { text: temp.text, color: temp.color };
    });
    console.log(tempList);
    reset({ tag: tempList });
  }, [data]);

  return (
    <>
      <div>tagformcomponent</div>
      <button onClick={onPlus}>plus</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={index}>
            <input type="text" {...register(`tag.${index}.text`)} />
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
            <button onClick={() => remove(index)}>delete</button>
          </div>
        ))}
        <input type="submit" value="送信" />
      </form>
    </>
  );
});

TagFormComponent.displayName = "TagFormComponent";
