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
  title,
  "aria-label": ariaLabel,
  ...props
}) => {
  const { theme } = useTheme();

  const accessibleName = (ariaLabel || (typeof title === "string" ? title : undefined)) ?? "Button";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ display: "inline-flex" }}
    >
      <MUIIconButton
        aria-label={accessibleName}
        title={title}
        {...props}
        sx={{
          color: active ? theme.color.accent.color : theme.palette.font.color,
          backgroundColor: active
            ? `${theme.color.accent.color}22`
            : "rgba(212, 196, 168, 0.12)",
          border: `1px solid ${
            active ? theme.color.accent.color : theme.palette.border
          }`,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: `${theme.color.accent.color}20`,
            borderColor: theme.color.accent.color,
            color: theme.color.accent.color,
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.color.accent.color}`,
            outlineOffset: "2px",
          },
          ...sx,
        }}
      >
        {children}
      </MUIIconButton>
    </motion.div>
  );
};
