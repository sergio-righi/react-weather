import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Rain, Snow } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const Precipitation = (props: Props) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack height={1} spacing={theme.margin.md}>
        <Custom.Typography variant="h5" color={theme.palette.font.accent}>
          {t.label.precipitation}
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack height={1} spacing={theme.margin.md}>
            <Stack height={1} spacing={theme.margin.xs}>
              {props.data.day.daily_chance_of_snow ? (
                <Stack
                  height={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={theme.margin.xs}
                  >
                    <Custom.Typography variant="h1">
                      {props.data.day.daily_chance_of_snow}
                    </Custom.Typography>
                    <Custom.Typography
                      variant="h3"
                      color={theme.palette.font.accent}
                    >
                      %
                    </Custom.Typography>
                  </Stack>
                  <Common.Image
                    src={Snow}
                    width={64}
                    height={64}
                    alt={t.label.snow}
                  />
                </Stack>
              ) : (
                <Stack
                  height={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={theme.margin.xs}
                  >
                    <Custom.Typography variant="h1">
                      {props.data.day.daily_chance_of_rain}
                    </Custom.Typography>
                    <Custom.Typography
                      variant="h3"
                      color={theme.palette.font.accent}
                    >
                      %
                    </Custom.Typography>
                  </Stack>
                  <Common.Image
                    src={Rain}
                    width={64}
                    height={64}
                    alt={t.label.rain}
                  />
                </Stack>
              )}
              <Stack direction="row" spacing={theme.margin.xs}>
                <Custom.Typography as="span" color={theme.palette.font.accent}>
                  {t.label.amount}
                </Custom.Typography>

                {props.data.day.daily_chance_of_snow ? (
                  <Custom.Typography
                    as="span"
                    fontWeight={theme.font.bold}
                    color={theme.color.accent.color}
                  >
                    {props.data.day.totalsnow_cm} cm
                  </Custom.Typography>
                ) : (
                  <Custom.Typography
                    as="span"
                    fontWeight={theme.font.bold}
                    color={theme.color.accent.color}
                  >
                    {isMetric
                      ? props.data.day.totalprecip_mm
                      : props.data.day.totalprecip_in}{" "}
                    {isMetric ? t.label.liquid.metric : t.label.liquid.imperial}
                  </Custom.Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
