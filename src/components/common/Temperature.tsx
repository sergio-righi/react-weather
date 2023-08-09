import { Custom } from "components";
import { useApp, useTheme } from "contexts";
import { Stack } from "@mui/material";
import { Enums } from "utils";

type Props = {
  tempC: number;
  tempF: number;
  size: "sm" | "md" | "lg";
};

export const Temperature = (props: Props) => {
  const { isMetric, t } = useApp();
  const { font, palette } = useTheme();

  const stylesheet =
    props.size === "sm"
      ? {
          header: {
            fontSize: font.md,
            fontWeight: font.semiBold,
            color: palette.font.accent,
          },
          subheader: {
            fontSize: font.md,
            fontWeight: font.semiBold,
            color: palette.font.accent,
          },
        }
      : props.size === "md"
      ? {
          header: { fontSize: font.md, fontWeight: font.semiBold },
          subheader: { fontSize: font.md, fontWeight: font.semiBold },
        }
      : {
          header: { fontSize: font.xxxl, fontWeight: font.bold },
          subheader: { fontSize: font.xl, fontWeight: font.semiBold },
        };

  return (
    <Stack direction="row" alignItems="flex-end">
      <Custom.Typography sx={{ lineHeight: 1, ...stylesheet.header }}>
        {Math.round(isMetric ? props.tempC : props.tempF)}
      </Custom.Typography>
      <Custom.Typography sx={{ lineHeight: 1, ...stylesheet.subheader }}>
        {isMetric ? t.label.temperature.metric : t.label.temperature.imperial}
      </Custom.Typography>
    </Stack>
  );
};
