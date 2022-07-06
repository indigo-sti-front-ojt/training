import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../provider/UserProvider";

export const Child1 = () => {
  const { setUserInfo } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");

  const ChangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const InputMethod = () => {
    setUserInfo(inputValue);
  };
  const OnKeyPressEnterInput = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.key == "Enter") {
      e.preventDefault();
      InputMethod();
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      margin={4}
    >
      <TextField
        id="standard-basic"
        onChange={ChangeMethod}
        onKeyDown={OnKeyPressEnterInput}
      />
      <Button variant="contained" color="primary" onClick={InputMethod}>
        送信
      </Button>
    </Box>
  );
};
