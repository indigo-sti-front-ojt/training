import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import CreateIcon from "@mui/icons-material/Create";
import BookIcon from "@mui/icons-material/Book";

export const Page2 = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            tooltipTitle="child1"
            icon={<CreateIcon fontSize="small" />}
            onClick={() => navigate("child1")}
          />
          <SpeedDialAction
            tooltipTitle="child2"
            icon={<BookIcon fontSize="small" />}
            onClick={() => navigate("child2")}
          />
        </SpeedDial>
      </Box>

      <Outlet></Outlet>
    </>
  );
};
