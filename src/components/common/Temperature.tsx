import React from "react";
import { Custom } from "components";
import { useApp, useTheme } from "contexts";
import { Stack } from "@mui/material";

type Props = {
  tempC: number;
  tempF: number;
  small?: boolean;
};

export const Temperature = (props: Props) => {
  const { t } = useApp();
  const { font, margin } = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={margin.sm}>
      <Custom.Typography
        fontSize={props.small ? font.md : font.xxxl}
        fontWeight={props.small ? font.normal : font.bold}
      >
        {Math.round(props.tempC)}
      </Custom.Typography>
      <Custom.Typography
        fontSize={props.small ? font.sm : font.xl}
        fontWeight={props.small ? font.normal : font.semiBold}
      >
        {t.label.temperature.celsius}
      </Custom.Typography>
    </Stack>
  );
};

Temperature.defaultProps = {
  small: false,
};
