import "assets/scss/components/navbar.scss";

import { Grid, Stack, IconButton } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Enums } from "utils";
import { Common, Custom } from "components";
import { HDate } from "helpers";
import { Fahrenheit, Theme } from "assets/images";

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
  const { theme, toggleTheme } = useTheme();

  const stylesheetSelected = {
    fontWeight: theme.font.bold,
    color: theme.color.accent,
  };
  const stylesheetUnselected = {
    cursor: "pointer",
    color: theme.palette.font.accent,
  };

  function handleToggleTheme() {
    toggleTheme();
  }

  function handleMeasurementChange() {
    setMeasurement(
      isMetric
        ? Enums.EnumMeasurementSystem.Imperial
        : Enums.EnumMeasurementSystem.Metric
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          px={theme.margin.md}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={theme.margin.sm}>
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
              {t.title.hourly}
            </Custom.Typography>
          </Stack>
          <Stack direction="row" spacing={theme.margin.sm}>
            <IconButton size="medium" onClick={handleMeasurementChange}>
              <Common.Image
                width={32}
                height={32}
                src={Fahrenheit}
                alt={t.label.temp}
              />
            </IconButton>
            <IconButton size="medium" onClick={handleToggleTheme}>
              <Common.Image
                src={Theme}
                width={32}
                height={32}
                alt={t.label.theme}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
