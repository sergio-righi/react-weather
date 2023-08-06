import { Box, Card, CardContent } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Common, Custom } from "components";
import { HDate } from "helpers";

type Props = {
  min: any;
  max: any;
  day: any;
  date: any;
  code: any;
  description: any;
  selected: boolean;
  onClick?: (value: any) => void;
};

export function Weather(props: Props) {
  const { locale, t } = useApp();
  const { color, font, margin, palette } = useTheme();

  const formattedDate = () => {
    return props.date
      ? HDate.toRelativeDate(props.date, t.relative_date, locale)
      : null;
  };

  const handleClick = (date: any) => props.onClick && props.onClick(props.date);

  return (
    <Card
      sx={{
        color: props.selected ? color.accent.text : palette.font.color,
        backgroundColor: props.selected
          ? color.accent.color
          : palette.background.color,
        cursor: props.selected ? null : "pointer",
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: margin.xs,
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Custom.Typography
            sx={{ fontSize: font.md, fontWeight: font.normal }}
          >
            {formattedDate()}
          </Custom.Typography>
          {/* <Common.WeatherIcon
            code={props.code}
            day={props.day}
            fill={props.selected ? color.accent.text : undefined}
          /> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: margin.xs,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Common.Temperature  value={props.max} />
            <Common.Temperature value={props.min} /> */}
          </Box>
          <Custom.Typography
            sx={{ fontSize: font.md, fontWeight: font.normal }}
          >
            {props.description}
          </Custom.Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
