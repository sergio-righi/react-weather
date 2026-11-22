import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { Custom } from "components";
import { useTheme } from "contexts";

type CompassGaugeProps = {
  directionText: string;
  size?: number;
};

const DIRECTION_DEGREES: Record<string, number> = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
};

export const CompassGauge: React.FC<CompassGaugeProps> = ({
  directionText,
  size = 76,
}) => {
  const { theme } = useTheme();
  const degrees =
    DIRECTION_DEGREES[directionText?.toUpperCase()?.trim()] ?? 0;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(212, 196, 168, 0.08)",
        border: `1px solid ${theme.palette.border}`,
        boxShadow: "inset 0 2px 6px rgba(139, 69, 19, 0.12)",
      }}
    >
      {/* Cardinal Labels */}
      <Custom.Typography
        fontSize={theme.font.xxs}
        fontWeight="700"
        sx={{
          position: "absolute",
          top: 3,
          color: theme.color.accent.color,
          lineHeight: 1,
        }}
      >
        N
      </Custom.Typography>
      <Custom.Typography
        fontSize={theme.font.xxs}
        sx={{
          position: "absolute",
          right: 4,
          color: theme.palette.font.accent,
          lineHeight: 1,
        }}
      >
        E
      </Custom.Typography>
      <Custom.Typography
        fontSize={theme.font.xxs}
        sx={{
          position: "absolute",
          bottom: 3,
          color: theme.palette.font.accent,
          lineHeight: 1,
        }}
      >
        S
      </Custom.Typography>
      <Custom.Typography
        fontSize={theme.font.xxs}
        sx={{
          position: "absolute",
          left: 4,
          color: theme.palette.font.accent,
          lineHeight: 1,
        }}
      >
        W
      </Custom.Typography>

      {/* Earthy Needle */}
      <motion.div
        animate={{ rotate: degrees }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: 32,
          height: 32,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box component="svg" viewBox="0 0 24 24" width="28" height="28">
          {/* North Arrow (Terracotta / Earth Clay) */}
          <Box component="polygon"
            points="12,2 15,12 12,9"
            fill="#C67B5C"
          />
          <Box component="polygon"
            points="12,2 9,12 12,9"
            fill="#8B4513"
          />
          {/* South Arrow (Sand / Olive Slate) */}
          <Box component="polygon"
            points="12,22 15,12 12,15"
            fill="#D4C4A8"
          />
          <Box component="polygon"
            points="12,22 9,12 12,15"
            fill="#6B7B3C"
          />
          {/* Center Hub */}
          <Box component="circle" cx="12" cy="12" r="2.5" fill="#F5F0E1" stroke="#8B4513" strokeWidth="0.8" />
        </Box>
      </motion.div>
    </Box>
  );
};
