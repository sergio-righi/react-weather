import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Custom } from "components";
import { ForecastApi, HourApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Anemometer, Speedometer, WindGust } from "assets/icons";

type Props = {
  data: ForecastApi;
};

export const Wind = (props: Props) => {
  const { isMetric, t } = useApp();
  const { margin, palette } = useTheme();
  const [currentHour, setCurrentHour] = useState<HourApi>();

  useEffect(() => {
    const now = new Date().getHours();
    if (props.data && props.data.hour) {
      const response = props.data.hour.filter(
        (item: HourApi) => now === new Date(item.time).getHours()
      );
      if (response.length > 0) {
        setCurrentHour(response[0]);
      }
    }
  }, [props.data]);

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack spacing={margin.md}>
        <Stack direction="row" justifyContent="space-between">
          <Custom.Typography variant="h5" color={palette.font.accent}>
            Wind
          </Custom.Typography>
          <Custom.Typography variant="h6" color={palette.font.accent}>
            (by hour)
          </Custom.Typography>
        </Stack>
        {currentHour && (
          <Stack spacing={margin.md}>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Anemometer width={32} height={32} />
              <Custom.Typography variant="h5">
                {currentHour.wind_dir}
              </Custom.Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Speedometer width={32} height={32} />
              <Custom.Typography variant="h5">
                {isMetric ? currentHour.wind_kph : currentHour.wind_mph}{" "}
                {isMetric ? t.label.speed.metric : t.label.speed.imperial}
              </Custom.Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <WindGust width={32} height={32} />
              <Custom.Typography variant="h5">
                {isMetric ? currentHour.gust_kph : currentHour.gust_mph}{" "}
                {isMetric ? t.label.speed.metric : t.label.speed.imperial}
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
