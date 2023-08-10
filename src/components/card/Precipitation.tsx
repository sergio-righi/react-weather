import { Stack } from "@mui/material";
import { Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Rain, Snow } from "assets/icons";

type Props = {
  data: ForecastApi;
};

export const Precipitation = (props: Props) => {
  const { isMetric, t } = useApp();
  const { margin, palette } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack spacing={margin.md}>
        <Custom.Typography variant="h5" color={palette.font.accent}>
          Precipitation
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack spacing={margin.md}>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Rain width={32} height={32} />
              <Custom.Typography variant="h5">
                {props.data.day.daily_chance_of_rain} %
              </Custom.Typography>
              <Custom.Typography variant="h5">
                {isMetric
                  ? props.data.day.totalprecip_mm
                  : props.data.day.totalprecip_in}{" "}
                {isMetric ? t.label.length.metric : t.label.length.imperial}
              </Custom.Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Snow width={32} height={32} />
              <Custom.Typography variant="h5">
                {props.data.day.daily_chance_of_snow} %
              </Custom.Typography>
              <Custom.Typography variant="h5">
                {props.data.day.totalsnow_cm} cm
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
