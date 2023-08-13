import { Grid } from "@mui/material";
import { Card } from "components";
import { useApp, useTheme } from "contexts";
import { ForecastApi, WeatherApi } from "interfaces";
import { useEffect } from "react";

type Props = {
  data: WeatherApi;
};

export const Week = (props: Props) => {
  const { theme } = useTheme();
  const { currentDate, setCurrentDate } = useApp();

  useEffect(() => {
    if (props.data && props.data.forecast) {
      const dates = props.data.forecast.forecastday.map(
        (item: ForecastApi) => item.date
      );
      if (dates && !dates.includes(currentDate)) {
        setCurrentDate(dates[0]);
      }
    }
  }, [props.data]);

  return (
    <Grid container alignItems="center" spacing={theme.margin.md}>
      {props.data &&
        props.data.forecast &&
        props.data.forecast.forecastday.map((item: ForecastApi, i: number) => (
          <Grid item xs={12} md={4} key={i}>
            <Card.Week item={item} selected={currentDate === item.date} />
          </Grid>
        ))}
    </Grid>
  );
};
