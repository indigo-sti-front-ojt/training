import React from "react";

type Props = {
  text: string;
};

export const Button = (props: Props) => {
  const { text } = props;
  return <button className="btn">{text}</button>;
};
