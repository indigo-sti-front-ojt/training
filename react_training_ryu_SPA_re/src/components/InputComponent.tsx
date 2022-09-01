import React, { memo } from "react";
type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};
export const InputComponent = memo((props: Props) => {
  const { text, setText } = props;
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <input
      className="form-input"
      type="text"
      value={text}
      onChange={onChangeText}
    />
  );
});

InputComponent.displayName = "InputComponent";
