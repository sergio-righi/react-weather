import "assets/scss/layouts/default.scss";

import { Outlet } from "react-router-dom";
import { useTheme } from "contexts";
import { ThemeProvider } from "@mui/material/styles";
import { Themes } from "utils";

export const DefaultLayout = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={Themes.defaultTheme(theme)}>
      {/* <Box className="wa-default">
        <Box className="wa-container">
          <Common.Navbar />
          <Box className="wa-wrapper">
            <Outlet />
          </Box>
        </Box>
      </Box> */}
      <Outlet />
    </ThemeProvider>
  );
};
