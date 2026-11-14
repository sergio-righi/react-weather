import "assets/scss/components/visualization/line_range.scss";

import { Box } from "@mui/material";
import { useTheme } from "contexts";
import { Custom } from "components";

interface Props {
  min: number;
  max: number;
  value: number;
}

export const LineRange = (props: Props) => {
  const { theme } = useTheme();

  const indicators = Array.from(
    { length: props.max - props.min + 1 },
    (_, index) => props.min + index
  );
  const range = props.max - props.min;
  const percentage = ((props.value - props.min) / range) * 100;

  const bgcolor =
    percentage <= 30
      ? theme.color.accent.color
      : percentage <= 70
      ? theme.color.status.warning.color
      : theme.color.status.error.color;

  return (
    <Box className="wa-visualization-line-range">
      <Box className="line" bgcolor={theme.palette.input.accent}>
        {indicators.map((item: number) => {
          const isCurrent = item === props.value;
          const position = ((item - props.min) / range) * 100;
          return (
            <Box
              key={item}
              className={`indicator${isCurrent ? " current" : ""}`}
              style={{ left: `calc(${position}% - 3px)` }}
            >
              <Box
                className="dot"
                bgcolor={isCurrent ? bgcolor : theme.palette.input.accent}
              />
              <Custom.Typography
                className="label"
                fontSize={isCurrent ? theme.font.md : theme.font.xxs}
                fontWeight={isCurrent ? theme.font.bold : theme.font.normal}
              >
                {item}
              </Custom.Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
