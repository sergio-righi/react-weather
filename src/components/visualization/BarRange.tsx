import "assets/scss/components/visualization/bar_range.scss";

import { Box } from "@mui/material";
import { useTheme } from "contexts";

interface Props {
  min: number;
  max: number;
  value: number;
}

export const BarRange = (props: Props) => {
  const { theme } = useTheme();
  const containerHeight = 80,
    containerWidth = 25,
    elementHeight = 20,
    elementWidth = 20,
    elementPadding = 6;

  const percentage =
    ((props.value - props.min) / (props.max - props.min)) * 100;
  const pixels = (percentage / 100) * containerHeight - elementHeight;
  const positionBottom =
    (pixels * (containerHeight - elementHeight + elementPadding)) /
      containerHeight +
    (elementHeight - elementPadding) / 2.5;

  const bgcolor =
    percentage < 30
      ? theme.color.accent.color
      : percentage < 70
      ? theme.color.status.warning.color
      : theme.color.status.error.color;

  return (
    <Box
      width={containerWidth}
      height={containerHeight}
      borderRadius={theme.border.radius}
      borderColor={theme.palette.border}
      bgcolor={theme.palette.background.color}
      className="wa-visualization-bar-range"
    >
      {/* <Box
        className="fill"
        bgcolor={bgcolor}
        width={elementWidth}
        style={{ height: `${percentage}%` }}
      /> */}

      <Box
        bgcolor={bgcolor}
        className="float"
        width={elementWidth}
        height={elementHeight}
        style={{ bottom: positionBottom }}
      />
    </Box>
  );
};
