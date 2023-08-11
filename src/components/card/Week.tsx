import { Stack } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Common, Custom } from "components";
import { HDate } from "helpers";
import { ForecastApi } from "interfaces";
import { Enums } from "utils";

// icons
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";

type Props = {
  item: ForecastApi;
  selected: boolean;
  onClick?: (value: string) => void;
};

export function Week(props: Props) {
  const { color, font, margin, palette } = useTheme();
  const { isMetric, locale, setCurrentDate, t } = useApp();

  const formattedDate = props.item.date
    ? HDate.toRelativeDate(props.item.date, t.relative_date, locale)
    : null;

  const stylesheet = props.selected
    ? {
        outlineWidth: 3,
        outlineStyle: "solid",
        outlineColor: color.accent.color,
      }
    : { cursor: "pointer" };

  function handleClick() {
    setCurrentDate(props.item.date);
  }

  return (
    <Custom.Card sx={{ width: 1, ...stylesheet }} onClick={handleClick}>
      <Stack spacing={margin.xs} alignItems="center" justifyContent="center">
        <Custom.Typography variant="h4">{formattedDate}</Custom.Typography>
        <Common.WeatherIcon condition={props.item.day.condition} />
        <Stack
          direction="row"
          spacing={margin.xs}
          alignItems="center"
          justifyContent="center"
        >
          <Common.Temperature
            size="md"
            tempC={props.item.day.maxtemp_c}
            tempF={props.item.day.maxtemp_f}
          />
          <Common.Temperature
            size="sm"
            tempC={props.item.day.mintemp_c}
            tempF={props.item.day.mintemp_f}
          />
        </Stack>
        {props.item.day.daily_will_it_rain === Enums.EnumYesNo.Yes ||
        props.item.day.daily_will_it_snow === Enums.EnumYesNo.Yes ? (
          <Stack direction="row">
            {props.item.day.daily_will_it_rain === Enums.EnumYesNo.Yes && (
              <Stack direction="row" alignItems="center">
                <WaterDropRoundedIcon
                  sx={{ color: palette.font.accent, fontSize: font.xs }}
                />
                <Custom.Typography color={palette.font.accent} variant="h6">
                  {isMetric
                    ? props.item.day.totalprecip_mm
                    : props.item.day.totalprecip_in}{" "}
                  {isMetric ? t.label.liquid.metric : t.label.liquid.imperial}
                </Custom.Typography>
              </Stack>
            )}
            {props.item.day.daily_will_it_snow === Enums.EnumYesNo.Yes && (
              <Stack direction="row" alignItems="center">
                <AcUnitRoundedIcon
                  sx={{ color: palette.font.accent, fontSize: font.xs }}
                />
                <Custom.Typography color={palette.font.accent} variant="h6">
                  {props.item.day.totalsnow_cm} cm
                </Custom.Typography>
              </Stack>
            )}
          </Stack>
        ) : (
          <Custom.Typography color={palette.font.accent} variant="h6">
            not raining or snowing
          </Custom.Typography>
        )}
      </Stack>
    </Custom.Card>
  );
}
