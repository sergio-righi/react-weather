import { Custom } from "components";
import { useApp, useTheme } from "contexts";

type Props = {
  tempC: number;
  tempF: number;
};

export const FeelsLike = (props: Props) => {
  const { t } = useApp();
  const { font } = useTheme();

  return (
    <Custom.Typography fontSize={font.xs} fontWeight={font.normal}>
      Feels like {props.tempC} {t.label.temperature.celsius}
    </Custom.Typography>
  );
};
