import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Icy } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const Visibility = (props: Props) => {
  const { isMetric, t } = useApp();
  const { font, color, margin, palette } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack spacing={margin.md}>
        <Custom.Typography variant="h5" color={palette.font.accent}>
          Visibility
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack spacing={margin.md}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={margin.xs}>
                <Custom.Typography variant="h1">
                  {isMetric
                    ? props.data.day.avgvis_km
                    : props.data.day.avgvis_miles}{" "}
                </Custom.Typography>
                <Custom.Typography variant="h3" color={palette.font.accent}>
                  {isMetric ? t.label.distance.metric : t.label.length.imperial}
                </Custom.Typography>
              </Stack>
              <Common.Image src={Icy} width={64} height={64} />
            </Stack>
            <Stack direction="row" spacing={margin.xs}>
              <Custom.Typography as="span" color={palette.font.accent}>
                Status
              </Custom.Typography>
              <Custom.Typography
                as="span"
                fontWeight={font.bold}
                color={color.accent.color}
              >
                Moderate
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
