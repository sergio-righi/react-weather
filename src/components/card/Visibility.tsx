import { Stack } from "@mui/material";
import { Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Binoculars } from "assets/icons";

type Props = {
  data: ForecastApi;
};

export const Visibility = (props: Props) => {
  const { isMetric, t } = useApp();
  const { margin, palette } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack spacing={margin.md}>
        <Custom.Typography variant="h5" color={palette.font.accent}>
          Visibility
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack spacing={margin.md}>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Binoculars width={32} height={32} />
              <Custom.Typography variant="h5">
                {isMetric
                  ? props.data.day.avgvis_km
                  : props.data.day.avgvis_miles}{" "}
                {isMetric ? t.label.distance.metric : t.label.length.imperial}
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
