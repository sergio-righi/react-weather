import React from "react";
import { useTheme } from "contexts";

type Props = {
  code: number;
  day: boolean;
  width?: number;
  height?: number;
  fill?: string;
};

export const WeatherIcon = (props: Props) => {
  const { palette } = useTheme();

  const iconStyle = {
    width: props.width ?? 64,
    height: props.height ?? 64,
    fill: props.fill ?? palette.font.color,
  };

  return <></>;
};
