import React, { memo, useEffect, useState } from "react";
import { TagTextObject } from "../types/TagTextObject";
import { InputComponent } from "./InputComponent";

type Props = {
  value: TagTextObject[] | undefined;
  onChange: (value: TagTextObject[]) => void;
};

export const InputLinksComponent = memo((props: Props) => {
  const { value, onChange } = props;
  const [firstFlag, setFirstFlag] = useState<boolean>(true);
  const [eatBlog1, setEatBlog1] = useState<string>("");
  const [eatBlog2, setEatBlog2] = useState<string>("");
  const [eatBlog3, setEatBlog3] = useState<string>("");

  useEffect(() => {
    if (firstFlag) {
      value?.forEach((data: TagTextObject) => {
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
    }
  }, [value]);
  useEffect(() => {
    if (!firstFlag) {
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
  }, [eatBlog1, eatBlog2, eatBlog3]);
  return (
    <>
      <div
        className="w-full flex flex-col gap-4"
        onFocus={() => setFirstFlag(false)}
      >
        <label className="flex flex-col gap-1 rounded-md bg-gray-50/20 px-2">
          <span className="w-full rounded-md bg-gray-400/20">食べログ</span>
          <InputComponent text={eatBlog1} setText={setEatBlog1} />
        </label>
        <label className="flex flex-col gap-1 rounded-md bg-gray-50/20 px-2">
          <span className="w-full rounded-md bg-gray-400/20">ぐるなび</span>
          <InputComponent text={eatBlog2} setText={setEatBlog2} />
        </label>
        <label className="flex flex-col gap-1 rounded-md bg-gray-50/20 px-2">
          <span className="w-full rounded-md bg-gray-400/20">instagram</span>
          <InputComponent text={eatBlog3} setText={setEatBlog3} />
        </label>
      </div>
    </>
  );
});

InputLinksComponent.displayName = "InputLinksComponent";
