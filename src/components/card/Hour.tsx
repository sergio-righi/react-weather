import { Stack } from "@mui/material";
import { useTheme } from "contexts";
import { Custom, Weather } from "components";
import { HDate } from "helpers";
import { HourApi } from "interfaces";

// icons
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";

type Props = {
  id: any;
  item: HourApi;
};

export function Hour(props: Props) {
  const { theme } = useTheme();

  const formattedDate = props.item.time
    ? HDate.toTimeAmPmString(HDate.toSeconds(new Date(props.item.time)), false)
    : null;

  return (
    <Custom.Card id={props.id} sx={{ overflow: "unset" }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={theme.margin.xs}
      >
        <Custom.Typography variant="h4">{formattedDate}</Custom.Typography>
        <Weather.Icon condition={props.item.condition} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={theme.margin.xs}
        >
          <Weather.Temperature
            size="md"
            tempC={props.item.temp_c}
            tempF={props.item.temp_f}
          />
          <Weather.Temperature
            size="sm"
            tempC={props.item.feelslike_c}
            tempF={props.item.feelslike_f}
          />
        </Stack>
        <Stack direction="row" spacing={theme.margin.md}>
          <Stack direction="row" alignItems="center">
            <WaterDropRoundedIcon
              sx={{ color: theme.palette.font.accent, fontSize: theme.font.xs }}
            />
            <Custom.Typography color={theme.palette.font.accent} variant="h6">
              {props.item.chance_of_rain}%
            </Custom.Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <AcUnitRoundedIcon
              sx={{ color: theme.palette.font.accent, fontSize: theme.font.xs }}
            />
            <Custom.Typography color={theme.palette.font.accent} variant="h6">
              {props.item.chance_of_snow}%
            </Custom.Typography>
          </Stack>
        </Stack>
      </Stack>
    </Custom.Card>
  );
}
