import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Weather } from "utils";
import { GlobalWarming } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const UVIndex = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack height={1} spacing={theme.margin.md}>
        <Custom.Typography variant="h5" color={theme.palette.font.accent}>
          {t.label.uv_index}
        </Custom.Typography>
        {props.data && props.data.day && (
          <Stack height={1} spacing={theme.margin.md}>
            <Stack
              height={1}
              justifyContent="space-evenly"
              spacing={theme.margin.xs}
            >
              <Stack
                height={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Custom.Typography variant="h1">
                  {props.data.day.uv}
                </Custom.Typography>
                <Common.Image src={GlobalWarming} width={72} height={72} />
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
                  {Weather.getUVIndexDescription(props.data.day.uv, t)}
                </Custom.Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
