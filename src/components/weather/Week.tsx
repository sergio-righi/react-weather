import { Grid } from "@mui/material";
import { Card } from "components";
import { useApp, useTheme } from "contexts";
import { ForecastApi, WeatherApi } from "interfaces";

type Props = {
  data: WeatherApi;
};

export const Week = (props: Props) => {
  const { theme } = useTheme();
  const { currentDate } = useApp();

  return (
    <Grid container alignItems="center" spacing={theme.margin.md}>
      {props.data &&
        props.data.forecast &&
        props.data.forecast.forecastday.map((item: ForecastApi, i: number) => {
          return (
            <Grid item xs={12} md={4} key={i}>
              <Card.Week item={item} selected={currentDate === item.date} />
            </Grid>
          );
        })}
    </Grid>
  );
};
