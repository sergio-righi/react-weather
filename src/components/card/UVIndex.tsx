import { Stack } from "@mui/material";
import { Common, Custom, Visualization } from "components";
import { ForecastApi } from "interfaces";
import { useTheme } from "contexts";
import { Weather } from "utils";
import { GlobalWarming } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const UVIndex = (props: Props) => {
  const { color, font, margin, palette } = useTheme();

  const uvDescription =
    props.data && props.data.day
      ? props.data.day.uv <= Weather.UV_INDEX.LOW
        ? "Low"
        : props.data.day.uv <= Weather.UV_INDEX.MODERATE
        ? "Moderate"
        : props.data.day.uv <= Weather.UV_INDEX.HIGH
        ? "High"
        : props.data.day.uv <= Weather.UV_INDEX.VERY_HIGH
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
            <Stack direction="column" spacing={margin.xs}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Custom.Typography variant="h1">
                  {props.data.day.uv}
                </Custom.Typography>
                <Common.Image src={GlobalWarming} width={72} height={72} />
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
                  {uvDescription}
                </Custom.Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
