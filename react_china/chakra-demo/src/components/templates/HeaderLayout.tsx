import { memo,FC,ReactNode } from "react";

import { Header } from "../organisms/layout/layouts/Header";

type Props = {
  children: ReactNode; //ReactNodeはreaturn内のタグで囲った要素
}
export const HeaderLayout:FC<Props> = memo((props) => {
  const {children} = props;
  return(
  <>
    <Header/>
    {children}
  </>
  )
});