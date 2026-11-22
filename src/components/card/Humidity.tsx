import React from "react";
import { Stack, Box } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Weather } from "utils";
import InvertColorsRoundedIcon from "@mui/icons-material/InvertColorsRounded";

type Props = {
  data: ForecastApi;
};

export const Humidity: React.FC<Props> = ({ data }) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();

  const humidity = data?.day?.avghumidity ?? 0;
  const tempC = data?.day?.avgtemp_c ?? 20;

  // Magnus-Tetens formula approximation for dew point
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * tempC) / (b + tempC) + Math.log(Math.max(humidity, 1) / 100);
  const dewPointC = Math.round((b * alpha) / (a - alpha));
  const dewPointF = Math.round((dewPointC * 9) / 5 + 32);

  const dewPointText = `${isMetric ? dewPointC : dewPointF}°${isMetric ? t.label.temperature.metric : t.label.temperature.imperial
    }`;

  const description = Weather.getHumidityDescription(humidity, t);

  const humidityColor =
    humidity > 70
      ? theme.color.status.warning.color
      : humidity < 30
        ? theme.color.accent.color
        : theme.color.status.success.color;

  return (
    <Common.GlassCard
      glowColor={humidityColor}
      sx={{ p: theme.spacing.lg, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={theme.spacing.sm}>
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          <InvertColorsRoundedIcon sx={{ color: humidityColor, fontSize: theme.font.sm }} />
          <Custom.Typography fontSize={theme.spacing.xs} fontWeight={theme.font.semiBold} color={theme.palette.font.accent}>
            {t.label.humidity}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge label={description || t.weather_humidity_level.moderate} color={humidityColor} size="sm" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto" py={theme.spacing.sm}>
        <Stack spacing={theme.spacing.xxs}>
          <Stack direction="row" alignItems="baseline" spacing={theme.spacing.xxs}>
            <Custom.Typography fontSize={theme.font.xl} fontWeight={theme.font.bold} sx={{ letterSpacing: "-0.03em" }}>
              {humidity}
            </Custom.Typography>
            <Custom.Typography fontSize={theme.font.sm} fontWeight={theme.font.medium} color={theme.palette.font.accent}>
              %
            </Custom.Typography>
          </Stack>
          <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
            {t.label.dew_point}:{" "}
            <Box component="span" sx={{ color: humidityColor, fontWeight: theme.font.semiBold }}>
              {dewPointText}
            </Box>
          </Custom.Typography>
        </Stack>

        {/* Circular Radial Gauge */}
        <Custom.RadialGauge value={humidity} max={100} color={humidityColor} size={78} strokeWidth={7} />
      </Stack>

      {/* Footer Status */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt={theme.spacing.xs}
        sx={{ borderTop: `1px solid ${theme.palette.border}` }}
      >
        <Custom.Typography fontSize={theme.font.xxs} color={theme.palette.font.accent}>
          {t.label.status}
        </Custom.Typography>
        <Custom.Typography fontSize={theme.font.xxs} fontWeight={theme.font.semiBold} color={humidityColor}>
          {description}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
