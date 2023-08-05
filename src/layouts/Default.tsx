import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTheme } from "context";
import { ThemeProvider } from "@mui/material/styles";
import { Themes } from "utils";

export const DefaultLayout = () => {
  const { setTheme, ...theme } = useTheme();

  return (
    <ThemeProvider theme={Themes.defaultTheme(theme)}>
      <Box>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};
