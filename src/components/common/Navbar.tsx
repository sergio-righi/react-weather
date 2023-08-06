import "assets/scss/components/navbar.scss";

import React from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Constants, Enums } from "utils";
import { Custom } from "components";

// icons
import RefreshIcon from "@mui/icons-material/Refresh";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useScrollTrigger from "@mui/material/useScrollTrigger";

type ScrollProps = {
  window?: any;
  children?: any;
};

function ElevationScroll(props: ScrollProps) {
  const { children, window } = props;
  const { color, palette } = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      color: trigger ? color.accent.text : palette.font.color,
      backgroundColor: trigger ? color.accent.color : palette.background.color,
    },
  });
}

type Props = {};

export function Navbar(props: Props) {
  const { location, setLocation, t } = useApp();
  const { id, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
    if (id === Enums.EnumTheme.Light) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
  };

  const handleRefresh = () => {};
  const handleChange = (value: string) => setLocation(value);

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className="wa-navbar">
          <Toolbar className="wa-toolbar">
            <Custom.Select
              value={location}
              onChange={handleChange}
              items={Object.values(Constants.LOCATIONS).map((item: string) => ({
                key: item,
                value: t.location[item],
              }))}
            />
            <Custom.Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: "center", textAlign: "center" }}
            >
              The Weather App
            </Custom.Typography>
            <IconButton size="medium" color="inherit" onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
            {/* <Custom.Switch
              size="small"
              before={t.label.temperature.celsius}
              after={t.label.temperature.fahrenheitd}
            /> */}
            <IconButton
              size="medium"
              color="inherit"
              onClick={handleToggleTheme}
            >
              {id === Enums.EnumTheme.Dark ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
