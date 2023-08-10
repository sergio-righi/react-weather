import "assets/scss/components/visualization/line_range.scss";

import { Box } from "@mui/material";
import { useTheme } from "contexts";
import { Custom } from "components";
import { Constants } from "utils";

interface Props {
  min: number;
  max: number;
  value: number;
}

export const LineRange = (props: Props) => {
  const { color, font, palette } = useTheme();

  const indicators = Array.from(
    { length: props.max - props.min + 1 },
    (_, index) => props.min + index
  );
  const range = props.max - props.min;
  const percentage = ((props.value - props.min) / range) * 100;

  const bgcolor =
    percentage <= 30
      ? color.accent.color
      : percentage <= 70
      ? color.status.warning.color
      : color.status.error.color;

  return (
    <Box className="wa-visualization-line-range">
      <Box className="line" bgcolor={palette.input.accent}>
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
                bgcolor={isCurrent ? bgcolor : palette.input.accent}
              />
              <Custom.Typography
                className="label"
                fontSize={isCurrent ? font.md : font.xxs}
                fontWeight={isCurrent ? "bold" : "normal"}
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
