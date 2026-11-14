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
                y: -3,
                boxShadow: glowColor
                  ? isDark
                    ? `0 12px 32px -8px ${glowColor}33, 0 1px 1px 0 rgba(255, 255, 255, 0.1) inset`
                    : `0 12px 30px -6px ${glowColor}35, 0 4px 12px rgba(15, 23, 42, 0.08)`
                  : isDark
                  ? "0 12px 32px -8px rgba(0, 0, 0, 0.45), 0 1px 1px 0 rgba(255, 255, 255, 0.1) inset"
                  : "0 12px 28px -6px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(15, 23, 42, 0.06)",
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }
            : undefined
        }
        whileTap={interactive ? { scale: 0.99 } : undefined}
        {...props}
        sx={{
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          backgroundColor: theme.palette.theme,
          borderRadius: `${theme.border.radius * theme.border.factor}px`,
          border: `1px solid ${theme.palette.border}`,
          boxShadow: isDark
            ? "0 8px 30px rgba(0, 0, 0, 0.15)"
            : "0 4px 20px rgba(15, 23, 42, 0.06), 0 1px 4px rgba(15, 23, 42, 0.04)",
          transition:
            "border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, box-shadow 0.25s ease",
          "&:hover": interactive
            ? {
                borderColor: glowColor || theme.color.accent.color,
              }
            : {},
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: isDark
              ? "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)"
              : "linear-gradient(90deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.08) 50%, rgba(15,23,42,0) 100%)",
            pointerEvents: "none",
          },
          ...sx,
        }}
      >
        {children}
      </MotionBox>
    );
  }
);

GlassCard.displayName = "GlassCard";
