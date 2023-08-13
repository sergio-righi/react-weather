import { Custom } from "components";
import { useApp } from "contexts";
import { HString } from "helpers";

type Props = {
  tempC: number;
  tempF: number;
};

export const FeelsLike = (props: Props) => {
  const { isMetric, t } = useApp();

  return (
    <Custom.Typography>
      {HString.interpolate(t.label.feels_like, {
        temp: isMetric ? props.tempC : props.tempF,
      })}{" "}
      {isMetric ? t.label.temperature.metric : t.label.temperature.imperial}
    </Custom.Typography>
  );
};
