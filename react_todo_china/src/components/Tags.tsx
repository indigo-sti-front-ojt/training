import React from "react";

type Props = {
  val: string[] | null;
  setState: React.Dispatch<React.SetStateAction<string[] | null>>;
  getTags: () => Promise<string[]>;
};

// タグのsuspence用コンポーネント
export const Tags = (props: Props) => {
  const { val, setState, getTags } = props;
  if (val === null) {
    if (setState) {
      throw getTags()
        .then((res) => {
          setState(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <>
      <p>{val}</p>
    </>
  );
};
