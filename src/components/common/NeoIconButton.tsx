import React from "react";
import { IconButton as MUIIconButton, IconButtonProps } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "contexts";

export type NeoIconButtonProps = IconButtonProps & {
  active?: boolean;
  glow?: boolean;
};

export const NeoIconButton: React.FC<NeoIconButtonProps> = ({
  active = false,
  glow = false,
  children,
  sx,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 450, damping: 20 }}
      style={{ display: "inline-flex" }}
    >
      <MUIIconButton
        {...props}
        sx={{
          color: active ? theme.color.accent.color : theme.palette.font.color,
          backgroundColor: active
            ? `${theme.color.accent.color}22`
            : "rgba(255, 255, 255, 0.04)",
          border: `1px solid ${
            active ? theme.color.accent.color : theme.palette.border
          }`,
          backdropFilter: "blur(12px)",
          boxShadow:
            glow || active
              ? `0 0 16px ${theme.color.accent.color}40`
              : "0 2px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: `${theme.color.accent.color}20`,
            borderColor: theme.color.accent.color,
            color: theme.color.accent.color,
          },
          ...sx,
        }}
      >
        {children}
      </MUIIconButton>
    </motion.div>
  );
};
