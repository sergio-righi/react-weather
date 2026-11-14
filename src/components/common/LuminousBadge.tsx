import React from "react";
import { Box, Stack } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";

type LuminousBadgeProps = {
  label: string;
  color?: string;
  pulse?: boolean;
  size?: "sm" | "md";
};

export const LuminousBadge: React.FC<LuminousBadgeProps> = ({
  label,
  color,
  pulse = false,
  size = "md",
}) => {
  const { theme } = useTheme();
  const badgeColor = color || theme.color.accent.color;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.75}
      sx={{
        display: "inline-flex",
        px: size === "sm" ? 1 : 1.25,
        py: size === "sm" ? 0.25 : 0.4,
        borderRadius: "9999px",
        backgroundColor: `${badgeColor}18`,
        border: `1px solid ${badgeColor}40`,
        backdropFilter: "blur(8px)",
      }}
    >
      {pulse && (
        <Box
          sx={{
            width: size === "sm" ? 6 : 8,
            height: size === "sm" ? 6 : 8,
            borderRadius: "50%",
            backgroundColor: badgeColor,
            boxShadow: `0 0 10px ${badgeColor}`,
            animation: "luminousPulse 2s infinite ease-in-out",
            "@keyframes luminousPulse": {
              "0%, 100%": { transform: "scale(1)", opacity: 1 },
              "50%": { transform: "scale(1.3)", opacity: 0.6 },
            },
          }}
        />
      )}
      <Custom.Typography
        fontSize={size === "sm" ? 10 : 12}
        fontWeight="600"
        sx={{
          color: badgeColor,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Custom.Typography>
    </Stack>
  );
};
