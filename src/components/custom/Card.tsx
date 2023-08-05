import React from "react";
import { Card as MUICard, CardContent } from "@mui/material";
import { useTheme } from "context";
import { Custom } from "components";
import { Light } from "themes";
import { Validations } from "utils";

type Props = {
  sx?: any;
  title?: string;
  href?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
};

export const Card = (props: Props) => {
  const { id, border, palette } = useTheme();
  const hasTitle = Validations.hasValue(props.title);

  return (
    <MUICard
      sx={{
        color: palette.font.color,
        borderRadius: border.radius,
        boxShadow: id === Light.id ? "0 3px 10px 0 " + palette.shadow : "unset",
        backgroundColor: palette.background.accent,
      }}
    >
      <CardContent sx={props.sx}>
        {hasTitle && (
          <Custom.Typography variant="h4">{props.title}</Custom.Typography>
        )}
        {props.children}
      </CardContent>
    </MUICard>
  );
};
