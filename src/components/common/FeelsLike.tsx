import { Custom } from "components";
import { useApp, useTheme } from "contexts";

type Props = {
  tempC: number;
  tempF: number;
};

export const FeelsLike = (props: Props) => {
  const { isMetric, t } = useApp();
  const { font } = useTheme();

  return (
    <Custom.Typography>
      Feels like {isMetric ? props.tempC : props.tempF}{" "}
      {isMetric ? t.label.temperature.metric : t.label.temperature.imperial}
    </Custom.Typography>
  );
};
