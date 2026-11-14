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
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: `1px solid ${theme.palette.border}`,
        boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Cardinal Labels */}
      <Custom.Typography
        fontSize={9}
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
        fontSize={9}
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
        fontSize={9}
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
        fontSize={9}
        sx={{
          position: "absolute",
          left: 4,
          color: theme.palette.font.accent,
          lineHeight: 1,
        }}
      >
        W
      </Custom.Typography>

      {/* Spring Animated Magnetic Needle */}
      <motion.div
        animate={{ rotate: degrees }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{
          width: 32,
          height: 32,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 24 24" width="28" height="28">
          {/* North Arrow (Cyan Luminous) */}
          <polygon
            points="12,2 15,12 12,9"
            fill={theme.color.accent.color}
          />
          <polygon
            points="12,2 9,12 12,9"
            fill={`${theme.color.accent.color}cc`}
          />
          {/* South Arrow (Subtle Slate) */}
          <polygon
            points="12,22 15,12 12,15"
            fill="rgba(255, 255, 255, 0.3)"
          />
          <polygon
            points="12,22 9,12 12,15"
            fill="rgba(255, 255, 255, 0.15)"
          />
          {/* Center Hub */}
          <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
        </svg>
      </motion.div>
    </Box>
  );
};
