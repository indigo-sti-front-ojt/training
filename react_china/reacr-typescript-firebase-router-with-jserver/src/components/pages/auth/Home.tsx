import React from "react";
import { Container, CssBaseline, Box } from "@mui/material";
export const Home = () => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <p>ここにコンテンツが入ります</p>
        </Box>
      </Container>
    </>
  );
};
