import React from "react";
import { useTheme } from "contexts";
import { Box, CircularProgress } from "@mui/material";

export type Props = {
  sx?: any;
};

export const PageProcess = (props: Props) => {
  const { color } = useTheme();
  return (
    <Box
      sx={{
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress sx={{ color: color.accent.color }} />
    </Box>
  );
};
