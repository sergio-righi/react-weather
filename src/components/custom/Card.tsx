import React from "react";
import {
  Card as MUICard,
  CardContent,
  CardProps,
  CardContentProps,
} from "@mui/material";
import { useTheme } from "contexts";
import { Light } from "themes";

type Props = CardProps & {};

export const Card = (props: Props) => {
  const { id, border, palette } = useTheme();

  return (
    <MUICard
      {...props}
      sx={{
        ...props.sx,
        color: palette.font.color,
        borderRadius: border.radius,
        // backgroundColor: palette.background.accent,
        // boxShadow: id === Light.id ? "0 3px 10px 0 " + palette.shadow : "unset",
      }}
      elevation={0}
    >
      <CardContent>{props.children}</CardContent>
    </MUICard>
  );
};
