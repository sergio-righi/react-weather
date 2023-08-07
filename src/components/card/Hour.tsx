import { Card, CardContent, Stack } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Common, Custom } from "components";
import { HDate } from "helpers";
import { HourApi } from "interfaces";
import { Enums } from "utils";

// icons
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";

type Props = {
  item: HourApi;
};

export function Hour(props: Props) {
  const { font, margin, palette } = useTheme();

  const formattedDate = props.item.time
    ? HDate.toTimeAmPmString(HDate.toSeconds(new Date(props.item.time)), false)
    : null;

  return (
    <Card>
      <CardContent>
        <Stack spacing={margin.xs} alignItems="center" justifyContent="center">
          <Custom.Typography variant="h4">{formattedDate}</Custom.Typography>
          <Common.WeatherIcon condition={props.item.condition} />
          <Stack
            direction="row"
            spacing={margin.xs}
            alignItems="center"
            justifyContent="center"
          >
            <Common.Temperature
              size="md"
              tempC={props.item.temp_c}
              tempF={props.item.temp_f}
            />
            <Common.Temperature
              size="sm"
              tempC={props.item.feelslike_c}
              tempF={props.item.feelslike_f}
            />
          </Stack>
          <Stack direction="row" spacing={margin.md}>
            <Stack direction="row" alignItems="center">
              <WaterDropRoundedIcon
                sx={{ color: palette.font.accent, fontSize: font.xs }}
              />
              <Custom.Typography color={palette.font.accent} variant="h6">
                {props.item.chance_of_rain}%
              </Custom.Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <AcUnitRoundedIcon
                sx={{ color: palette.font.accent, fontSize: font.xs }}
              />
              <Custom.Typography color={palette.font.accent} variant="h6">
                {props.item.chance_of_snow}%
              </Custom.Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
