import { Stack } from "@mui/material";
import { Custom } from "components";
import { ForecastApi } from "interfaces";
import { useTheme } from "contexts";
import { Sunset, Sunrise } from "assets/icons";

type Props = {
  data: ForecastApi;
};

export const Sunlight = (props: Props) => {
  const { margin, palette } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack spacing={margin.md}>
        <Custom.Typography variant="h5" color={palette.font.accent}>
          Sunrise & Sunset
        </Custom.Typography>
        {props.data && props.data.astro && (
          <Stack spacing={margin.md}>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Sunrise width={32} height={32} />
              <Custom.Typography variant="h5">
                {props.data.astro.sunrise}
              </Custom.Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Sunset width={32} height={32} />
              <Custom.Typography variant="h5">
                {props.data.astro.sunset}
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
