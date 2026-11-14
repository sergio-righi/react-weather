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

  const dewPointText = `${isMetric ? dewPointC : dewPointF}°${
    isMetric ? t.label.temperature.metric : t.label.temperature.imperial
  }`;

  const description = Weather.getHumidityDescription(humidity, t);

  const humidityColor =
    humidity > 70
      ? theme.color.status.warning.color
      : humidity < 30
      ? "#38BDF8"
      : theme.color.status.success.color;

  return (
    <Common.GlassCard
      glowColor={humidityColor}
      sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <InvertColorsRoundedIcon sx={{ color: humidityColor, fontSize: 18 }} />
          <Custom.Typography fontSize={13} fontWeight="600" color={theme.palette.font.accent}>
            {t.label.humidity}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge label={description || t.weather_humidity_level.moderate} color={humidityColor} size="sm" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto">
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Custom.Typography fontSize={38} fontWeight="700" sx={{ letterSpacing: "-0.03em" }}>
              {humidity}
            </Custom.Typography>
            <Custom.Typography fontSize={18} fontWeight="500" color={theme.palette.font.accent}>
              %
            </Custom.Typography>
          </Stack>
          <Custom.Typography fontSize={12} color={theme.palette.font.accent}>
            {t.label.dew_point}:{" "}
            <Box component="span" sx={{ color: humidityColor, fontWeight: "600" }}>
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
        pt={1}
        sx={{ borderTop: `1px solid ${theme.palette.border}` }}
      >
        <Custom.Typography fontSize={11} color={theme.palette.font.accent}>
          {t.label.status}
        </Custom.Typography>
        <Custom.Typography fontSize={11} fontWeight="600" color={humidityColor}>
          {description}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
