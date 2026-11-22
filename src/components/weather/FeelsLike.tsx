import React from "react";
import { useApp, useTheme } from "contexts";
import { Custom } from "components";
import { HString } from "helpers";

type Props = {
  tempC?: number;
  tempF?: number;
};

export const FeelsLike: React.FC<Props> = ({ tempC = 0, tempF = 0 }) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();
  const value = isMetric ? Math.round(Number(tempC)) : Math.round(Number(tempF));

  return (
    <Custom.Typography fontSize={theme.font.xs} fontWeight={theme.font.semiBold}>
      {HString.interpolate(t.label.feels_like, {
        temp: `${value}°`,
      })}
    </Custom.Typography>
  );
};
