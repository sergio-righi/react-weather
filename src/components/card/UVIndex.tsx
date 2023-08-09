import { Stack } from "@mui/material";
import { Custom } from "components";
import { ForecastApi } from "interfaces";
import { useTheme } from "contexts";

type Props = {
  data: ForecastApi;
};

export const UVIndex = (props: Props) => {
  const { margin, palette } = useTheme();

  const uvDescription =
    props.data && props.data.day
      ? props.data.day.uv < 3
        ? "Low"
        : props.data.day.uv < 6
        ? "Moderate"
        : props.data.day.uv < 8
        ? "High"
        : props.data.day.uv < 11
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
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Custom.Typography variant="h5">
                {props.data.day.uv}
              </Custom.Typography>
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
