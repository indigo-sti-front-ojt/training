import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export const Layout = () => {
  const [value, setValue] = useState("0");
  const changeValue = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setValue(value);
  };

  return (
    <>
      <Outlet></Outlet>
      <BottomNavigation
        value={value}
        onChange={changeValue}
        showLabels
        sx={{
          position: "fixed",
          bottom: 0,
        }}
      >
        <BottomNavigationAction
          label="Page1"
          value={"1"}
          component={Link}
          to="page1"
        />
        <BottomNavigationAction
          label="Page2"
          value={"2"}
          component={Link}
          to="page2"
        />
        <BottomNavigationAction
          label="Page3"
          value={"3"}
          component={Link}
          to="page3"
        />
      </BottomNavigation>
    </>
  );
};
