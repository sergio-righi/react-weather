import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ConditionApi } from "interfaces";
import { useTheme, useApp } from "contexts";
import { Enums } from "utils";
import {
  HolographicWeatherArt,
  getWeatherCategory,
} from "components/custom/HolographicWeatherArt";

type Props = {
  condition: ConditionApi;
  size?: number | { xs?: number; sm?: number; md?: number };
};

export const Icon: React.FC<Props> = ({ condition, size = 68 }) => {
  const { theme } = useTheme();
  const { isDay } = useApp();
  const isDark = theme.id === Enums.EnumTheme.Dark;

  if (!condition) {
    return null;
  }

  const category = getWeatherCategory(condition.code, condition.text, isDay);

  const numericSize =
    typeof size === "number" ? size : size.md || size.sm || size.xs || 68;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HolographicWeatherArt category={category} size={numericSize} />
    </Box>
  );
};
