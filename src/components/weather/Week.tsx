import { Stack } from "@mui/material";
import { Card } from "components";
import { useTheme } from "contexts";
import { ForecastApi, WeatherApi } from "interfaces";

type Props = {
  data: WeatherApi;
};

export const Week = (props: Props) => {
  const { margin } = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={margin.md}>
      {props.data &&
        props.data.forecast &&
        props.data.forecast.forecastday.map((item: ForecastApi, i: number) => {
          return <Card.Week item={item} key={i} />;
        })}
    </Stack>
  );
};
