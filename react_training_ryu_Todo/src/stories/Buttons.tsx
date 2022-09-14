import React from "react";
import Button from "@mui/material/Button";

type Props = {
  onClick: () => void;
  text: string;
  flag: boolean;
};

export const btn = ({ onClick, text }: Props) => {
  return (
    <>
      <Button variant="contained" onClick={onClick}>
        {text}
      </Button>
    </>
  );
};
