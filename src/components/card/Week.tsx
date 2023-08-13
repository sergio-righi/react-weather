import { Stack } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Custom, Weather } from "components";
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
  const { theme } = useTheme();
  const { isMetric, locale, setCurrentDate, t } = useApp();

  const formattedDate = props.item.date
    ? HDate.toRelativeDate(props.item.date, t.relative_date, locale)
    : null;

  const textColor = props.selected
    ? theme.color.accent.text
    : theme.palette.font.color;
  const textLightColor = props.selected
    ? theme.color.accent.text
    : theme.palette.font.accent;

  const stylesheet = props.selected
    ? {
        color: theme.color.accent.text,
        backgroundColor: theme.color.accent.color,
      }
    : { cursor: "pointer" };

  function handleClick() {
    setCurrentDate(props.item.date);
  }

  return (
    <Custom.Card sx={{ width: 1, ...stylesheet }} onClick={handleClick}>
      <Stack
        spacing={theme.margin.xs}
        alignItems="center"
        justifyContent="center"
      >
        <Custom.Typography variant="h4" color={textColor}>
          {formattedDate}
        </Custom.Typography>
        <Weather.Icon condition={props.item.day.condition} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={theme.margin.xs}
        >
          <Weather.Temperature
            size="md"
            color={textColor}
            tempC={props.item.day.maxtemp_c}
            tempF={props.item.day.maxtemp_f}
          />
          <Weather.Temperature
            size="sm"
            color={textColor}
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
                  sx={{ color: textLightColor, fontSize: theme.font.xs }}
                />
                <Custom.Typography color={textLightColor} variant="h6">
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
                  sx={{ color: textLightColor, fontSize: theme.font.xs }}
                />
                <Custom.Typography color={textLightColor} variant="h6">
                  {props.item.day.totalsnow_cm} {t.label.length.metric}
                </Custom.Typography>
              </Stack>
            )}
          </Stack>
        ) : (
          <Custom.Typography color={textLightColor} variant="h6">
            {t.message.weather.not_raining_snowing}
          </Custom.Typography>
        )}
      </Stack>
    </Custom.Card>
  );
}
