import React from "react";
import { Typography } from "@mui/material";
import { useApp, useTheme } from "contexts";

type Props = {
  sx?: any;
  value: any;
};

export const Temperature = (props: Props) => {
  const { t } = useApp();
  const { font } = useTheme();
  const fontSize = () =>
    props.sx?.fontSize ? props.sx.fontSize * 2 : font.xxxl;

  return (
    <Typography
      component="div"
      sx={{
        fontSize: fontSize(),
        fontWeight: font.normal,
      }}
    >
      {Math.round(props.value)}
      <Typography
        component="sup"
        sx={{
          fontSize: props.sx?.fontSize ?? font.lg,
          fontWeight: font.normal,
        }}
      >
        {t.label.temperature.celsius}
      </Typography>
    </Typography>
  );
};
