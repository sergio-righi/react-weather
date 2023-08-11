import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi, HourApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Wind as WindImage, WindGauge, Windsock } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const Wind = (props: Props) => {
  const { isMetric, t } = useApp();
  const { color, font, margin, palette } = useTheme();
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
            <Stack direction="column" spacing={margin.md}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Custom.Typography variant="h3">
                  {currentHour.wind_dir}
                </Custom.Typography>
                <Common.Image src={Windsock} width={48} height={48} />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={margin.md}>
                  <Custom.Typography variant="h3">
                    {isMetric ? currentHour.wind_kph : currentHour.wind_mph}{" "}
                  </Custom.Typography>
                  <Custom.Typography variant="h4" color={palette.font.accent}>
                    {isMetric ? t.label.speed.metric : t.label.speed.imperial}
                  </Custom.Typography>
                </Stack>
                <Common.Image src={WindGauge} width={48} height={48} />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={margin.xs}>
              <Custom.Typography as="span" color={palette.font.accent}>
                Gusts
              </Custom.Typography>
              <Custom.Typography
                as="span"
                fontWeight={font.bold}
                color={color.accent.color}
              >
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
