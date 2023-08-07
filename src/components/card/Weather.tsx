import { Box, Card, CardContent, Stack } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Common, Custom } from "components";
import { HDate } from "helpers";
import { ForecastApi } from "interfaces";

type Props = {
  item: ForecastApi;
  onClick?: (value: any) => void;
};

export function Weather(props: Props) {
  const { locale, t } = useApp();
  const { color, font, margin, palette } = useTheme();

  const formattedDate = props.item.date
    ? HDate.toRelativeDate(props.item.date, t.relative_date, locale)
    : null;

  // const handleClick = (date: any) => props.onClick && props.onClick(props.date);

  return (
    <Card
    // sx={{
    //   color: props.selected ? color.accent.text : palette.font.color,
    //   backgroundColor: props.selected
    //     ? color.accent.color
    //     : palette.background.color,
    //   cursor: props.selected ? null : "pointer",
    // }}
    // onClick={handleClick}
    >
      <CardContent>
        <Stack spacing={margin.xs} alignItems="center" justifyContent="center">
          <Custom.Typography
            sx={{ fontSize: font.md, fontWeight: font.normal }}
          >
            {formattedDate}
          </Custom.Typography>
          <Common.WeatherIcon condition={props.item.day.condition} />
          <Stack
            spacing={margin.xs}
            alignItems="center"
            justifyContent="center"
          >
            <Common.Temperature
              small
              tempC={props.item.day.maxtemp_c}
              tempF={props.item.day.maxtemp_f}
            />
            <Common.Temperature
              small
              tempC={props.item.day.mintemp_c}
              tempF={props.item.day.mintemp_f}
            />
          </Stack>
          <Custom.Typography
            sx={{ fontSize: font.md, fontWeight: font.normal }}
          >
            asdasd
          </Custom.Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
