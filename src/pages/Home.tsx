import { useEffect, useState } from "react";
import { useApp, useService, useTheme } from "contexts";
import { Card, Custom, Weather } from "components";
import { ForecastApi, WeatherApi } from "interfaces";
import { Grid, Stack } from "@mui/material";
import { HDate } from "helpers";

type Props = {};

export const Home = (props: Props) => {
  const { theme } = useTheme();
  const { weather } = useService();
  const { currentDate, isDay, location, t } = useApp();
  const [week, setWeek] = useState<WeatherApi>({} as WeatherApi);
  const [today, setToday] = useState<ForecastApi>({} as ForecastApi);

  useEffect(() => {
    const fetchData = async () => {
      setWeek(await weather.week(location.value));
    };
    fetchData();
  }, [location]);

  useEffect(() => setDataToday(), [currentDate, week]);

  function setDataToday() {
    if (week && week.forecast && week.forecast.forecastday) {
      setToday(
        week.forecast.forecastday.filter((item: ForecastApi) =>
          HDate.isDateEquals(item.date, currentDate)
        )[0]
      );
    }
  }

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} md={3} bgcolor={theme.palette.background.color}>
        <Weather.Now />
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        md={9}
        display="flex"
        bgcolor={theme.palette.background.accent}
      >
        <Grid container p={theme.margin.md} spacing={theme.margin.sm}>
          {/* first row */}
          <Grid item width={1} height={0.33} flexGrow={1}>
            <Grid container spacing={theme.margin.sm}>
              {/* first row */}
              <Grid item xs={12}>
                {/* control navbar */}
                <Weather.Navbar />
              </Grid>

              {/* second row */}
              <Grid item xs={12} flexGrow={1}>
                {/* daily weather */}
                {isDay && <Weather.Week data={week} />}
                {/* weather hour by hour */}
                {!isDay && <Weather.Hourly data={today} />}
              </Grid>
            </Grid>
          </Grid>

          {/* second row */}
          <Grid item height={0.66} flexGrow={1}>
            <Grid container spacing={theme.margin.sm} height={1}>
              {/* first row */}
              <Grid item xs={12} height={0.07} flexGrow={1}>
                <Stack direction="row" px={theme.margin.md}>
                  <Custom.Typography
                    fontSize={theme.font.sm}
                    color={theme.palette.font.accent}
                  >
                    {t.title.today_highlight}
                  </Custom.Typography>
                </Stack>
              </Grid>

              {/* second row */}
              <Grid item xs={12} height={0.465} flexGrow={1}>
                <Grid container spacing={theme.margin.sm} height={1}>
                  <Grid item xs={12} md={4}>
                    {/* precipitation (rain and snow) */}
                    <Card.Precipitation data={today} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {/* wind direction, speed, gust */}
                    <Card.Wind data={today} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {/* sunset and sunrise */}
                    <Card.Sunlight data={today} />
                  </Grid>
                </Grid>
              </Grid>

              {/* third row */}
              <Grid item xs={12} height={0.465} flexGrow={1}>
                <Grid container spacing={theme.margin.sm} height={1}>
                  <Grid item xs={12} md={4}>
                    {/* uv index level */}
                    <Card.UVIndex data={today} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {/* humidity level */}
                    <Card.Humidity data={today} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {/* air quality level */}
                    <Card.Visibility data={today} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
