import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Card } from "components";
import { useTheme } from "contexts";
import { ForecastApi, HourApi, WeatherApi } from "interfaces";
import { HDate } from "helpers";

type Props = {
  date: string;
  data: WeatherApi;
};

export const Hourly = (props: Props) => {
  const { margin } = useTheme();
  const [data, setData] = useState<ForecastApi>({} as ForecastApi);

  useEffect(() => {
    if (props.data && props.data.forecast && props.data.forecast.forecastday) {
      const today = props.data.forecast.forecastday.filter(
        (item: ForecastApi) => HDate.isDateEquals(item.date, props.date)
      )[0];
      setData(today);
    }
  }, [props.data]);

  return (
    <Grid container spacing={margin.md}>
      {data &&
        data.hour &&
        data.hour.map((item: HourApi, i: number) => {
          return (
            <Grid item xs key={i}>
              <Card.Hour item={item} />
            </Grid>
          );
        })}
    </Grid>
  );
};
