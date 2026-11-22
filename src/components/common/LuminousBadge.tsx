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
      spacing={theme.spacing.xs}
      sx={{
        display: "inline-flex",
        px: size === "sm" ? theme.spacing.xs : theme.spacing.sm,
        py: size === "sm" ? theme.spacing.xxs : theme.spacing.xxs,
        borderRadius: "9999px",
        backgroundColor: `${badgeColor}18`,
        border: `1px solid ${badgeColor}40`,
      }}
    >
      {pulse && (
        <Box
          sx={{
            width: size === "sm" ? 6 : 8,
            height: size === "sm" ? 6 : 8,
            borderRadius: "50%",
            backgroundColor: badgeColor,
          }}
        />
      )}
      <Custom.Typography
        fontSize={size === "sm" ? theme.font.xxs : theme.font.xs}
        fontWeight={theme.font.semiBold}
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
