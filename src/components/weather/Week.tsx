import { Stack } from "@mui/material";
import { Card } from "components";
import { useApp, useTheme } from "contexts";
import { ForecastApi, WeatherApi } from "interfaces";

type Props = {
  data: WeatherApi;
};

export const Week = (props: Props) => {
  const { margin } = useTheme();
  const { currentDate } = useApp();

  return (
    <Stack direction="row" alignItems="center" spacing={margin.md}>
      {props.data &&
        props.data.forecast &&
        props.data.forecast.forecastday.map((item: ForecastApi, i: number) => {
          return (
            <Card.Week
              key={i}
              item={item}
              selected={currentDate === item.date}
            />
          );
        })}
    </Stack>
  );
};
