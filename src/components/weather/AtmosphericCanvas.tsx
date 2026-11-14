import React from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "contexts";

type AtmosphericCanvasProps = {
  conditionCode?: number;
  isDay?: boolean;
};

interface AuroraConfig {
  gradient1: string;
  gradient2: string;
  gradient3: string;
  accentAura: string;
}

const getAtmosphericAura = (
  code: number = 1000,
  isDay: boolean = true
): AuroraConfig => {
  if (!isDay) {
    return {
      gradient1: "radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.12) 0%, transparent 55%)",
      gradient2: "radial-gradient(circle at 85% 25%, rgba(129, 140, 248, 0.09) 0%, transparent 60%)",
      gradient3: "radial-gradient(circle at 50% 85%, rgba(30, 41, 59, 0.4) 0%, transparent 70%)",
      accentAura: "#38BDF8",
    };
  }

  // Thunderstorm: 1087, 1273, 1276, 1279, 1282
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return {
      gradient1: "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.22) 0%, transparent 55%)",
      gradient2: "radial-gradient(circle at 80% 30%, rgba(0, 210, 255, 0.18) 0%, transparent 60%)",
      gradient3: "radial-gradient(circle at 50% 80%, rgba(30, 27, 75, 0.5) 0%, transparent 70%)",
      accentAura: "#A855F7",
    };
  }

  // Rain: 1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246
  if (
    [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)
  ) {
    return {
      gradient1: "radial-gradient(circle at 15% 25%, rgba(14, 165, 233, 0.20) 0%, transparent 50%)",
      gradient2: "radial-gradient(circle at 85% 20%, rgba(20, 184, 166, 0.16) 0%, transparent 55%)",
      gradient3: "radial-gradient(circle at 60% 85%, rgba(15, 23, 42, 0.45) 0%, transparent 70%)",
      accentAura: "#0EA5E9",
    };
  }

  // Snow: 1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
    return {
      gradient1: "radial-gradient(circle at 25% 15%, rgba(224, 242, 254, 0.18) 0%, transparent 55%)",
      gradient2: "radial-gradient(circle at 75% 35%, rgba(165, 243, 252, 0.14) 0%, transparent 60%)",
      gradient3: "radial-gradient(circle at 40% 80%, rgba(241, 245, 249, 0.08) 0%, transparent 70%)",
      accentAura: "#38BDF8",
    };
  }

  // Sunny / Clear: 1000, 1003
  if ([1000, 1003].includes(code)) {
    return {
      gradient1: "radial-gradient(circle at 10% 10%, rgba(251, 191, 36, 0.20) 0%, transparent 50%)",
      gradient2: "radial-gradient(circle at 90% 20%, rgba(0, 210, 255, 0.18) 0%, transparent 60%)",
      gradient3: "radial-gradient(circle at 50% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 65%)",
      accentAura: "#00D2FF",
    };
  }

  // Cloudy / Fog / Default
  return {
    gradient1: "radial-gradient(circle at 20% 15%, rgba(148, 163, 184, 0.16) 0%, transparent 55%)",
    gradient2: "radial-gradient(circle at 80% 25%, rgba(56, 189, 248, 0.12) 0%, transparent 60%)",
    gradient3: "radial-gradient(circle at 50% 85%, rgba(30, 41, 59, 0.3) 0%, transparent 70%)",
    accentAura: "#94A3B8",
  };
};

export const AtmosphericCanvas: React.FC<AtmosphericCanvasProps> = ({
  conditionCode = 1000,
  isDay = true,
}) => {
  const { theme } = useTheme();
  const aura = getAtmosphericAura(conditionCode, isDay);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: theme.palette.background.color,
        transition: "background-color 0.5s ease",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${conditionCode}-${isDay ? "day" : "night"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        >
          {/* Layer 1: Primary Ambient Glow */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: aura.gradient1,
              filter: "blur(60px)",
            }}
          />

          {/* Layer 2: Secondary Chromatic Glow */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: aura.gradient2,
              filter: "blur(80px)",
            }}
          />

          {/* Layer 3: Depth Diffuser */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: aura.gradient3,
              filter: "blur(100px)",
            }}
          />

          {/* Subtle Dynamic Mesh Noise Texture */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.03,
              backgroundImage:
                "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};
