import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Weather } from "utils";
import { Visibility as VisibilityImage } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const Visibility = (props: Props) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack height={1} spacing={theme.margin.md}>
        <Custom.Typography variant="h5" color={theme.palette.font.accent}>
          {t.label.visibility}
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack height={1} spacing={theme.margin.md}>
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
                  {isMetric
                    ? props.data.day.avgvis_km
                    : props.data.day.avgvis_miles}{" "}
                </Custom.Typography>
                <Custom.Typography
                  variant="h3"
                  color={theme.palette.font.accent}
                >
                  {isMetric
                    ? t.label.distance.metric
                    : t.label.distance.imperial}
                </Custom.Typography>
              </Stack>
              <Common.Image
                width={64}
                height={64}
                src={VisibilityImage}
                alt={t.label.visibility}
              />
            </Stack>
            <Stack direction="row" spacing={theme.margin.xs}>
              <Custom.Typography as="span" color={theme.palette.font.accent}>
                {t.label.status}
              </Custom.Typography>
              <Custom.Typography
                as="span"
                fontWeight={theme.font.bold}
                color={theme.color.accent.color}
              >
                {Weather.getVisibilityDescription(props.data.day.avgvis_km, t)}
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
