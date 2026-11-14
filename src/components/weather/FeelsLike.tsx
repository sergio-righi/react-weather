import React from "react";
import { useApp } from "contexts";
import { Custom } from "components";
import { HString } from "helpers";

type Props = {
  tempC?: number;
  tempF?: number;
};

export const FeelsLike: React.FC<Props> = ({ tempC = 0, tempF = 0 }) => {
  const { isMetric, t } = useApp();
  const value = isMetric ? Math.round(Number(tempC)) : Math.round(Number(tempF));

  return (
    <Custom.Typography fontSize={13} fontWeight="600">
      {HString.interpolate(t.label.feels_like, {
        temp: `${value}°`,
      })}
    </Custom.Typography>
  );
};
