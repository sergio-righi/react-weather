import React from "react";
import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { Custom } from "components";
import { useTheme } from "contexts";

type RadialGaugeProps = {
  value: number;
  max: number;
  label?: string;
  unit?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  value,
  max,
  label,
  unit,
  color,
  size = 90,
  strokeWidth = 8,
}) => {
  const { theme } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Arc spanning 260 degrees (open at the bottom)
  const arcLength = (260 / 360) * circumference;
  const percentage = Math.min(Math.max(value / (max || 1), 0), 1);
  const strokeDashoffset = arcLength * (1 - percentage);

  const gaugeColor = color || theme.color.accent.color;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box component="svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(140deg)" }}
      >
        {/* Background Track */}
        <Box component="circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.palette.input.accent}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          opacity={0.3}
        />

        {/* Animated Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gaugeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 4px ${gaugeColor}40)` }}
        />
      </Box>

      {/* Center Value */}
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Stack direction="row" alignItems="baseline" spacing={theme.spacing.xxs}>
          <Custom.Typography
            fontSize={size > 80 ? theme.font.lg : theme.font.md}
            fontWeight={theme.font.bold}
            sx={{ letterSpacing: "-0.02em" }}
          >
            {value}
          </Custom.Typography>
          {unit && (
            <Custom.Typography
              fontSize={theme.font.xs}
              color={theme.palette.font.accent}
              fontWeight={theme.font.medium}
            >
              {unit}
            </Custom.Typography>
          )}
        </Stack>
        {label && (
          <Custom.Typography
            fontSize={theme.font.xxs}
            color={theme.palette.font.accent}
            fontWeight={theme.font.semiBold}
            sx={{ textTransform: "uppercase", mt: -theme.spacing.xxs }}
          >
            {label}
          </Custom.Typography>
        )}
      </Stack>
    </Box>
  );
};
