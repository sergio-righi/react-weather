import "assets/scss/components/navbar.scss";

import { Stack, IconButton } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Enums } from "utils";
import { Custom } from "components";
import { HDate } from "helpers";

// icons
import RefreshIcon from "@mui/icons-material/Refresh";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

type Props = {};

export function Navbar(props: Props) {
  const {
    currentDate,
    locale,
    isDay,
    isMetric,
    setMeasurement,
    setViewSelection,
    t,
  } = useApp();
  const { color, font, id, margin, palette, toggleTheme } = useTheme();

  const stylesheetSelected = { fontWeight: font.bold, color: color.accent };
  const stylesheetUnselected = {
    cursor: "pointer",
    color: palette.font.accent,
  };

  function handleToggleTheme() {
    toggleTheme();
    if (id === Enums.EnumTheme.Light) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
    }
  }

  function handleMeasurementChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    setMeasurement(
      checked
        ? Enums.EnumMeasurementSystem.Imperial
        : Enums.EnumMeasurementSystem.Metric
    );
  }

  function handleRefresh() {}

  return (
    <Stack
      direction="row"
      px={margin.sm}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={margin.md}>
        <Custom.Typography
          onClick={() => setViewSelection(Enums.EnumViewSelection.Day)}
          sx={isDay ? stylesheetSelected : stylesheetUnselected}
        >
          {HDate.toRelativeDate(currentDate, t.relative_date, locale)}
        </Custom.Typography>
        <Custom.Typography
          onClick={() => setViewSelection(Enums.EnumViewSelection.Hourly)}
          sx={!isDay ? stylesheetSelected : stylesheetUnselected}
        >
          Hourly
        </Custom.Typography>
      </Stack>
      <Stack direction="row" spacing={margin.md}>
        <Stack direction="row" spacing={margin.xs} alignItems="center">
          <Custom.Typography>
            {t.label.measurement_system.metric}
          </Custom.Typography>
          <Custom.Switch
            checked={!isMetric}
            onChange={handleMeasurementChange}
          />
          <Custom.Typography>
            {t.label.measurement_system.imperial}
          </Custom.Typography>
        </Stack>
        {/* <IconButton size="medium" color="inherit" onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
        <IconButton size="medium" color="inherit" onClick={handleToggleTheme}>
          {id === Enums.EnumTheme.Dark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton> */}
      </Stack>
    </Stack>
  );
}
