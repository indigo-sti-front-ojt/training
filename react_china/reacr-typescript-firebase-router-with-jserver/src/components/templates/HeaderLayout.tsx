import React from "react";
import { memo, FC, ReactNode } from "react";

import { Header } from "../organisms/layouts/Header";


type Props = {
  children: ReactNode; //ReactNodeはreaturn内のタグで囲った要素
};

export const HeaderLayout: FC<Props> = memo((props: Props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
});

HeaderLayout.displayName = "HeaderLayout";
