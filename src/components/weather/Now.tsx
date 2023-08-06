import React, { useEffect } from "react";
import { Common } from "components";
import { Box, Stack } from "@mui/material";
import { Custom } from "components";
import { CurrentApi } from "interfaces";
import { HDate, HNumber, HString } from "helpers";
import { useApp, useService, useTheme } from "contexts";

type Props = {};

export const Now = (props: Props) => {
  const { margin } = useTheme();
  const { weather } = useService();
  const { location, t } = useApp();

  const datenow = new Date();
  const [data, setData] = React.useState<CurrentApi>({} as CurrentApi);

  useEffect(() => {
    const fetchData = async () => {
      const response = await weather.today(location);
      console.log(response);
      setData(response);
    };
    fetchData();
  }, [location]);

  const uvLevel =
    data.uv < 3
      ? "Low"
      : data.uv < 6
      ? "Moderate"
      : data.uv < 8
      ? "High"
      : data.uv < 11
      ? "Very High"
      : "Extreme";

  return (
    <Stack spacing={margin.md}>
      <Stack alignItems="center" justifyContent="center">
        <Custom.Typography variant="h3">
          {HDate.weekday(datenow)}
        </Custom.Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="center">
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Common.WeatherIcon condition={data.condition} />
          <Common.Temperature tempC={data.temp_c} tempF={data.temp_f} />
        </Stack>
        <Common.FeelsLike tempC={data.feelslike_c} tempF={data.feelslike_f} />
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={margin.xl}>
        <Stack alignItems="center">
          <Custom.Typography variant="h6">Humidity</Custom.Typography>
          <Custom.Typography variant="h5">{data.humidity}</Custom.Typography>
        </Stack>
        <Stack alignItems="center">
          <Custom.Typography variant="h6">Humidity</Custom.Typography>
          <Custom.Typography variant="h5">{data.wind_kph}</Custom.Typography>
        </Stack>
        <Stack alignItems="center">
          <Custom.Typography variant="h6">UV</Custom.Typography>
          <Custom.Typography variant="h5">{uvLevel}</Custom.Typography>
        </Stack>
      </Stack>
      <Stack alignItems="center" justifyContent="center">
        <Custom.Typography as="small">
          {HString.interpolate(t.message.feedback.updated_at, {
            time: data.last_updated,
          })}
        </Custom.Typography>
      </Stack>
    </Stack>
  );
};
