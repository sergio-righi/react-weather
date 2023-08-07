import { Card, CardContent, Stack } from "@mui/material";
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
  onClick?: (value: string) => void;
};

export function Week(props: Props) {
  const { locale, t } = useApp();
  const { font, margin, palette } = useTheme();

  const formattedDate = props.item.date
    ? HDate.toRelativeDate(props.item.date, t.relative_date, locale)
    : null;

  function handleClick() {
    props.onClick && props.onClick(props.item.date);
  }

  return (
    <Card onClick={handleClick}>
      <CardContent>
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
                    {props.item.day.totalprecip_mm}mm
                  </Custom.Typography>
                </Stack>
              )}
              {props.item.day.daily_will_it_snow === Enums.EnumYesNo.Yes && (
                <Stack direction="row" alignItems="center">
                  <AcUnitRoundedIcon
                    sx={{ color: palette.font.accent, fontSize: font.xs }}
                  />
                  <Custom.Typography color={palette.font.accent} variant="h6">
                    {props.item.day.totalsnow_cm}cm
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
      </CardContent>
    </Card>
  );
}
