import React, { Children } from "react";

type ChildrenProps = {
  children: React.ReactElement[];
};
export const ListChildMapComponent = ({ children }: ChildrenProps) => {
  return (
    <>
      {Children.map(children, (child: React.ReactNode) => {
        return <li>{child}</li>;
      })}
    </>
  );
};
