import React from "react";
import { Box, BoxProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";
import { useTheme } from "contexts";
import { Enums } from "utils";

export type GlassCardProps = BoxProps &
  MotionProps & {
    interactive?: boolean;
    glowColor?: string;
    children?: React.ReactNode;
  };

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ interactive = true, glowColor, children, sx, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme.id === Enums.EnumTheme.Dark;

    const MotionBox = motion(Box);

    return (
      <MotionBox
        ref={ref}
        whileHover={
          interactive
            ? {
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" },
              }
            : undefined
        }
        whileTap={interactive ? { scale: 0.99 } : undefined}
        {...props}
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: theme.palette.theme,
          borderRadius: theme.border.radius,
          border: `1px solid ${theme.palette.border}`,
          boxShadow: isDark
            ? "0 2px 10px rgba(0, 0, 0, 0.4)"
            : "0 2px 8px rgba(139, 69, 19, 0.06)",
          transition:
            "border-color 0.2s ease-out, background-color 0.2s ease-out, box-shadow 0.2s ease-out",
          "&:hover": interactive
            ? {
                borderColor: glowColor || theme.color.accent.color,
              }
            : {},
          ...sx,
        }}
      >
        {children}
      </MotionBox>
    );
  }
);

GlassCard.displayName = "GlassCard";
