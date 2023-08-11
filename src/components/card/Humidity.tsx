import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Humid } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const Humidity = (props: Props) => {
  const { color, font, margin, palette } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack spacing={margin.md}>
        <Custom.Typography variant="h5" color={palette.font.accent}>
          Humidity
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
                  {props.data.day.avghumidity}
                </Custom.Typography>
                <Custom.Typography variant="h3" color={palette.font.accent}>
                  %
                </Custom.Typography>
              </Stack>
              <Common.Image src={Humid} width={64} height={64} />
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
