import React from "react";
import { useApp, useTheme } from "contexts";
import { Custom } from "components";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  tempC?: number;
  tempF?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
};

export const Temperature: React.FC<Props> = ({
  tempC = 0,
  tempF = 0,
  size = "md",
  color,
}) => {
  const { isMetric } = useApp();
  const { theme } = useTheme();

  const tempVal = isMetric ? Math.round(Number(tempC)) : Math.round(Number(tempF));

  const fontSize =
    size === "lg" ? { xs: 44, md: 54 } : size === "md" ? 22 : 15;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${tempVal}-${isMetric ? "C" : "F"}`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ display: "inline-flex", alignItems: "baseline" }}
      >
        <Custom.Typography
          fontSize={fontSize}
          fontWeight={theme.font.bold}
          color={color || theme.palette.font.color}
          sx={{
            letterSpacing: size === "lg" ? "-0.04em" : "-0.02em",
            lineHeight: 1,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {tempVal}°
        </Custom.Typography>
      </motion.span>
    </AnimatePresence>
  );
};
