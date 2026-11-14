import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "contexts";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Themes } from "utils";

export const EmptyLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={Themes.defaultTheme(theme)}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
};
