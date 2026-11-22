import React, { useEffect, useState, useCallback } from "react";
import { useApp, useService, useTheme } from "contexts";
import { Card, Custom, Weather } from "components";
import { ForecastApi, WeatherApi, HourApi } from "interfaces";
import { Grid, Stack, Box } from "@mui/material";
import { HDate } from "helpers";

export const Home: React.FC = () => {
  const { theme } = useTheme();
  const { weather } = useService();
  const { currentDate, isDay, location, t } = useApp();
  const [week, setWeek] = useState<WeatherApi>({} as WeatherApi);
  const [today, setToday] = useState<ForecastApi>({} as ForecastApi);

  const fetchWeekData = useCallback(async () => {
    if (location?.value) {
      const data = await weather.week(location.value);
      if (data) {
        setWeek(data);
      }
    }
  }, [weather, location]);

  useEffect(() => {
    fetchWeekData();
  }, [fetchWeekData]);

  const updateTodayData = useCallback(() => {
    if (week?.forecast?.forecastday && week.forecast.forecastday.length > 0) {
      const matched = week.forecast.forecastday.find((item: ForecastApi) =>
        HDate.isDateEquals(item.date, currentDate)
      );
      setToday(matched || week.forecast.forecastday[0]);
    }
  }, [week, currentDate]);

  useEffect(() => {
    updateTodayData();
  }, [updateTodayData]);

  // Handler for time scrubber hour selection
  const handleSelectScrubberHour = (hour: HourApi) => {
    if (today && today.day) {
      setToday((prev) => ({
        ...prev,
        day: {
          ...prev.day,
          avgtemp_c: hour.temp_c,
          avgtemp_f: hour.temp_f,
          avghumidity: hour.humidity,
          daily_chance_of_rain: hour.chance_of_rain,
          daily_chance_of_snow: hour.chance_of_snow,
          uv: hour.uv,
        },
      }));
    }
  };

  const currentConditionCode = week?.current?.condition?.code || 1000;
  const isDaytime = week?.current ? week.current.is_day === 1 : true;

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", md: "100vh" },
        minHeight: "100vh",
        display: "flex",
        width: "100%",
        overflow: { xs: "visible", md: "hidden" },
      }}
    >
      {/* Dynamic 2030 Ambient Atmospheric Canvas */}
      <Weather.AtmosphericCanvas
        conditionCode={currentConditionCode}
        isDay={isDaytime}
      />

      <Grid
        container
        sx={{
          position: "relative",
          zIndex: 1,
          height: { xs: "auto", md: "100vh" },
          width: "100%",
          m: 0,
        }}
      >
        {/* Left Hero Sidebar: Fixed on Desktop, Natural flow on Mobile */}
        <Grid
          item
          xs={12}
          md={4.5}
          lg={3.5}
          xl={3}
          sx={{
            height: { xs: "auto", md: "100vh" },
            position: { xs: "relative", md: "sticky" },
            top: 0,
            display: "flex",
            flexDirection: "column",
            borderRight: { md: `1px solid ${theme.palette.border}` },
            zIndex: 2,
          }}
        >
          <Weather.Now />
        </Grid>

        {/* Right Main Bento Intelligence Dashboard: Independently scrollable */}
        <Grid
          item
          xs={12}
          md={7.5}
          lg={8.5}
          xl={9}
          sx={{
            height: { xs: "auto", md: "100vh" },
            overflowY: { xs: "visible", md: "auto" },
            WebkitOverflowScrolling: "touch",
            display: "flex",
            flexDirection: "column",
            px: { xs: theme.spacing.sm, sm: theme.spacing.lg, md: theme.spacing.xxl },
            py: { xs: theme.spacing.md, sm: theme.spacing.lg, md: theme.spacing.xxl },
          }}
        >
          <Stack
            spacing={{ xs: theme.spacing.md, sm: theme.spacing.lg }}
            sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}
          >
            {/* Top Control Navbar */}
            <Weather.Navbar />

            {/* Severe Weather Alert HUD (if any active warnings) */}
            {week?.alerts && <Weather.AlertBanner alerts={week.alerts} />}

            {/* View Selection: 7-Day Forecast or 24-Hour Scrubber */}
            <Box sx={{ width: "100%" }}>
              {isDay && <Weather.Week data={week} />}
              {!isDay && (
                <Weather.Hourly
                  data={today}
                  onSelectHour={handleSelectScrubberHour}
                />
              )}
            </Box>

            {/* Multi-Metric Atmospheric Trend Curve (ECharts) */}
            {today?.hour && today.hour.length > 0 && (
              <Box sx={{ width: "100%" }}>
                <Weather.TrendChart data={today} />
              </Box>
            )}

            {/* Telemetry Highlights Section */}
            <Stack gap={theme.spacing.md} sx={{ width: "100%" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                px={theme.spacing.xxs}
              >
                <Custom.Typography
                  fontSize={{ xs: theme.font.sm, sm: theme.font.md }}
                  fontWeight={theme.font.bold}
                  sx={{ letterSpacing: "-0.01em" }}
                >
                  {t.title.today_highlight}
                </Custom.Typography>
                <Custom.Typography
                  fontSize={theme.font.xs}
                  color={theme.palette.font.accent}
                >
                  {today?.date ? HDate.toRelativeDate(today.date, t.relative_date) : ""}
                </Custom.Typography>
              </Stack>

              {/* Bento Grid: Row 1 */}
              <Grid container spacing={{ xs: theme.spacing.md, sm: theme.spacing.lg }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card.Precipitation data={today} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card.Wind data={today} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card.Sunlight data={today} />
                </Grid>
              </Grid>

              {/* Bento Grid: Row 2 */}
              <Grid container spacing={{ xs: theme.spacing.md, sm: theme.spacing.lg }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card.UVIndex data={today} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card.Humidity data={today} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card.Visibility data={today} />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
