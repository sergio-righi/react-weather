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
  const { color, font, margin, palette } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack spacing={margin.md} height={1}>
        <Custom.Typography variant="h5" color={palette.font.accent}>
          Precipitation
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack spacing={margin.md} height={1}>
            <Stack direction="column" spacing={margin.xs} height={1}>
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
                    spacing={margin.xs}
                  >
                    <Custom.Typography variant="h1">
                      {props.data.day.daily_chance_of_snow}
                    </Custom.Typography>
                    <Custom.Typography variant="h3" color={palette.font.accent}>
                      %
                    </Custom.Typography>
                  </Stack>
                  <Common.Image src={Snow} width={64} height={64} />
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
                    spacing={margin.xs}
                  >
                    <Custom.Typography variant="h1">
                      {props.data.day.daily_chance_of_rain}
                    </Custom.Typography>
                    <Custom.Typography variant="h3" color={palette.font.accent}>
                      %
                    </Custom.Typography>
                  </Stack>
                  <Common.Image src={Rain} width={64} height={64} />
                </Stack>
              )}
              <Stack direction="row" spacing={margin.xs}>
                <Custom.Typography as="span" color={palette.font.accent}>
                  Amount
                </Custom.Typography>

                {props.data.day.daily_chance_of_snow ? (
                  <Custom.Typography
                    as="span"
                    fontWeight={font.bold}
                    color={color.accent.color}
                  >
                    {props.data.day.totalsnow_cm} cm
                  </Custom.Typography>
                ) : (
                  <Custom.Typography
                    as="span"
                    fontWeight={font.bold}
                    color={color.accent.color}
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
