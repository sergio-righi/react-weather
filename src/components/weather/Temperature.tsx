import { Custom } from "components";
import { useApp, useTheme } from "contexts";
import { Stack } from "@mui/material";

type Props = {
  tempC: number;
  tempF: number;
  color?: string;
  size: "sm" | "md" | "lg";
};

export const Temperature = (props: Props) => {
  const { theme } = useTheme();
  const { isMetric, t } = useApp();

  const stylesheet =
    props.size === "sm"
      ? {
          header: {
            fontSize: theme.font.md,
            fontWeight: theme.font.medium,
            color: props.color,
            opacity: 0.7,
          },
          subheader: {
            fontSize: theme.font.md,
            fontWeight: theme.font.medium,
            color: props.color,
            opacity: 0.7,
          },
        }
      : props.size === "md"
      ? {
          header: {
            fontSize: theme.font.md,
            fontWeight: theme.font.semiBold,
            color: props.color,
          },
          subheader: {
            fontSize: theme.font.md,
            fontWeight: theme.font.semiBold,
            color: props.color,
          },
        }
      : {
          header: { fontSize: theme.font.xxxl, fontWeight: theme.font.bold },
          subheader: {
            fontSize: theme.font.xl,
            fontWeight: theme.font.semiBold,
          },
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
