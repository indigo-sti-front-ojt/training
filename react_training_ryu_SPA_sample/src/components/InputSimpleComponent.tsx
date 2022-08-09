import React from "react";
import { TagTextObject } from "../types/TagTextObject";

type Props = {
  value: TagTextObject[] | undefined;
  onChange: (value: TagTextObject[]) => void;
};

export const InputSimpleComponent = (props: Props) => {
  const { value, onChange } = props;
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange([{ tag: "content", text: e.target.value }]);
  };
  return (
    <>
      <div>simple component</div>
      {value && value.length != 0 ? (
        <textarea value={value[0].text} onChange={onChangeText} />
      ) : (
        <textarea onChange={onChangeText} />
      )}
    </>
  );
};
