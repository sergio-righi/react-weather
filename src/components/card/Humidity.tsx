import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Weather } from "utils";
import { Humid } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const Humidity = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack height={1} spacing={theme.margin.md}>
        <Custom.Typography variant="h5" color={theme.palette.font.accent}>
          {t.label.humidity}
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
                  {props.data.day.avghumidity}
                </Custom.Typography>
                <Custom.Typography
                  variant="h3"
                  color={theme.palette.font.accent}
                >
                  %
                </Custom.Typography>
              </Stack>
              <Common.Image src={Humid} width={64} height={64} />
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
                {Weather.getHumidityDescription(props.data.day.avghumidity, t)}
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
