import React from "react";
import { Custom } from "components";
import { useApp, useTheme } from "contexts";
import { Stack } from "@mui/material";

type Props = {
  tempC: number;
  tempF: number;
};

export const Temperature = (props: Props) => {
  const { t } = useApp();
  const { font, margin } = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={margin.sm}>
      <Custom.Typography fontSize={font.xxxl} fontWeight={font.bold}>
        {Math.round(props.tempC)}
      </Custom.Typography>
      <Custom.Typography fontSize={font.xl} fontWeight={font.semiBold}>
        {t.label.temperature.celsius}
      </Custom.Typography>
    </Stack>
  );
};
