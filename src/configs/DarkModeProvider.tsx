"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const DarkModeProvider = (props: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default DarkModeProvider;
