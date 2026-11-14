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
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 2030 Ambient Holographic Glow Aura */}
      <Box
        sx={{
          position: "absolute",
          width: "85%",
          height: "85%",
          borderRadius: "50%",
          background: isDark
            ? `radial-gradient(circle, ${theme.color.accent.color}40 0%, transparent 70%)`
            : `radial-gradient(circle, ${theme.color.accent.color}20 0%, transparent 70%)`,
          filter: "blur(14px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating 2030 Levitation Micro-Interaction */}
      <motion.div
        animate={{
          y: [-3, 3, -3],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HolographicWeatherArt category={category} size={numericSize} />
      </motion.div>
    </Box>
  );
};
