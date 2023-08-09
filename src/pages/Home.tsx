import { useEffect, useState } from "react";
import { useApp, useService, useTheme } from "contexts";
import { Card, Common, Weather } from "components";
import { ForecastApi, WeatherApi } from "interfaces";
import { Grid, Stack } from "@mui/material";
import { HDate } from "helpers";

type Props = {};

export const Home = (props: Props) => {
  const { weather } = useService();
  const { margin, palette } = useTheme();
  const { currentDate, isDay, location, t } = useApp();
  const [week, setWeek] = useState<WeatherApi>({} as WeatherApi);
  const [today, setToday] = useState<ForecastApi>({} as ForecastApi);

  useEffect(() => {
    const fetchData = async () => {
      setWeek(await weather.week(location));
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
    <Grid container height={1}>
      {/* Sidebar */}
      <Grid item md={3} xs={12} height={1} bgcolor={palette.background.color}>
        <Weather.Now />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} md={9} height={1} bgcolor={palette.background.accent}>
        <Stack p={margin.md} spacing={margin.md}>
          <Stack spacing={margin.md}>
            {/* control navbar */}
            <Common.Navbar />
            {/* daily weather */}
            {isDay && <Weather.Week data={week} />}
            {/* weather hour by hour */}
            {!isDay && <Weather.Hourly data={today} />}
          </Stack>
          <Stack direction="row" spacing={margin.md} height={1}>
            {/* precipitation (rain and snow) */}
            <Card.Precipitation data={today} />
            {/* wind direction, speed, gust */}
            <Card.Wind data={today} />
            {/* sunset and sunrise */}
            <Card.Sunlight data={today} />
          </Stack>
          <Stack direction="row" spacing={margin.md} height={1}>
            {/* uv index level */}
            <Card.UVIndex data={today} />
            {/* humidity level */}
            <Card.Humidity data={today} />
            {/* air quality level */}
            <Card.Visibility data={today} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
