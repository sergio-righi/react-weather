import { Stack } from "@mui/material";
import { Custom, Visualization } from "components";
import { ForecastApi } from "interfaces";
import { useTheme } from "contexts";
import { Constants } from "utils";

type Props = {
  data: ForecastApi;
};

export const UVIndex = (props: Props) => {
  const { margin, palette } = useTheme();

  const uvDescription =
    props.data && props.data.day
      ? props.data.day.uv <= Constants.UV_INDEX.LOW
        ? "Low"
        : props.data.day.uv <= Constants.UV_INDEX.MODERATE
        ? "Moderate"
        : props.data.day.uv <= Constants.UV_INDEX.HIGH
        ? "High"
        : props.data.day.uv <= Constants.UV_INDEX.VERY_HIGH
        ? "Very High"
        : "Extreme"
      : "";

  return (
    <Custom.Card sx={{ width: 1, height: 1 }}>
      <Stack spacing={margin.md}>
        <Custom.Typography variant="h5" color={palette.font.accent}>
          UV Index
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack spacing={margin.md}>
            <Stack direction="column" alignItems="center" spacing={margin.xs}>
              <Visualization.LineRange
                min={0}
                max={Constants.UV_INDEX.EXTREME}
                value={props.data.day.uv}
              />
              <Custom.Typography variant="h5">
                {uvDescription}
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
