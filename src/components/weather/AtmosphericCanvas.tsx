import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "contexts";

type AtmosphericCanvasProps = {
  conditionCode?: number;
  isDay?: boolean;
};

// Clean, solid, distraction-free matte surface
export const AtmosphericCanvas: React.FC<AtmosphericCanvasProps> = () => {
  const { theme } = useTheme();

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
        backgroundColor: theme.palette.background.color,
        transition: "background-color 0.3s ease",
      }}
    />
  );
};
