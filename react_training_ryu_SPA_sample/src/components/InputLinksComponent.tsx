import React, { memo, useEffect, useState } from "react";
import { TagTextObject } from "../types/TagTextObject";
import { InputComponent } from "./InputComponent";

type Props = {
  value: TagTextObject[] | undefined;
  onChange: (value: TagTextObject[]) => void;
};

export const InputLinksComponent = memo((props: Props) => {
  const { value, onChange } = props;
  const [firstFlag, setFirstFlag] = useState<boolean>(false);
  const [eatBlog1, setEatBlog1] = useState<string>("");
  const [eatBlog2, setEatBlog2] = useState<string>("");
  const [eatBlog3, setEatBlog3] = useState<string>("");

  useEffect(() => {
    if (!firstFlag) {
      console.log(value);
      value?.map((data: TagTextObject) => {
        switch (data.tag) {
          case "食べログ":
            setEatBlog1(data.text);
            break;
          case "ぐるなび":
            setEatBlog2(data.text);
            break;
          case "instagram":
            setEatBlog3(data.text);
            break;
        }
      });
    } else {
      onChange([
        {
          tag: "食べログ",
          text: eatBlog1,
        },
        {
          tag: "ぐるなび",
          text: eatBlog2,
        },
        {
          tag: "instagram",
          text: eatBlog3,
        },
      ]);
    }
  }, [eatBlog1, eatBlog2, eatBlog3, value]);
  return (
    <>
      <div>input links componet</div>
      <div onFocus={() => setFirstFlag(true)}>
        <label>
          <span>食べログ</span>
          <InputComponent text={eatBlog1} setText={setEatBlog1} />
        </label>
        <label>
          <span>ぐるなび</span>
          <InputComponent text={eatBlog2} setText={setEatBlog2} />
        </label>
        <label>
          <span>instagram</span>
          <InputComponent text={eatBlog3} setText={setEatBlog3} />
        </label>
      </div>
    </>
  );
});

InputLinksComponent.displayName = "InputLinksComponent";
