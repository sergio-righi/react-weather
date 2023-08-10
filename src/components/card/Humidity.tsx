import { Stack } from "@mui/material";
import { Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Droplets } from "assets/icons";

type Props = {
  data: ForecastApi;
};

export const Humidity = (props: Props) => {
  const { margin, palette } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack spacing={margin.md}>
        <Custom.Typography variant="h5" color={palette.font.accent}>
          Humidity
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack spacing={margin.md}>
            <Stack direction="row" alignItems="center" spacing={margin.md}>
              <Droplets width={32} height={32} />
              <Custom.Typography variant="h5">
                {props.data.day.avghumidity} %
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
