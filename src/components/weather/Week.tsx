import { Grid } from "@mui/material";
import { Card } from "components";
import { useTheme } from "contexts";
import { ForecastApi, WeatherApi } from "interfaces";

type Props = {
  data: WeatherApi;
  onClick: (date: string) => void;
};

export const Week = (props: Props) => {
  const { margin } = useTheme();

  function handleDateClick(date: string) {
    props.onClick && props.onClick(date);
  }

  return (
    <Grid container spacing={margin.md}>
      {props.data &&
        props.data.forecast &&
        props.data.forecast.forecastday.map((item: ForecastApi) => {
          return (
            <Grid item xs key={item.date}>
              <Card.Week item={item} onClick={handleDateClick} />
            </Grid>
          );
        })}
    </Grid>
  );
};
