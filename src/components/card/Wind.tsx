import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi, HourApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import AirRoundedIcon from "@mui/icons-material/AirRounded";

type Props = {
  data: ForecastApi;
};

export const Wind: React.FC<Props> = ({ data }) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();
  const [currentHour, setCurrentHour] = useState<HourApi | undefined>();

  useEffect(() => {
    const currentHourIndex = new Date().getHours();
    if (data?.hour && data.hour.length > 0) {
      const match = data.hour.find(
        (item: HourApi) => new Date(item.time).getHours() === currentHourIndex
      );
      setCurrentHour(match || data.hour[0]);
    }
  }, [data]);

  const windSpeed = isMetric
    ? currentHour?.wind_kph ?? 0
    : currentHour?.wind_mph ?? 0;
  const gustSpeed = isMetric
    ? currentHour?.gust_kph ?? 0
    : currentHour?.gust_mph ?? 0;
  const windDir = currentHour?.wind_dir || "N";
  const speedUnit = isMetric ? t.label.speed.metric : t.label.speed.imperial;

  return (
    <Common.GlassCard
      glowColor={theme.color.accent.color}
      sx={{ p: theme.spacing.lg, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={theme.spacing.sm}>
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          <AirRoundedIcon sx={{ color: theme.color.accent.color, fontSize: theme.font.sm }} />
          <Custom.Typography fontSize={theme.font.xs} fontWeight={theme.font.semiBold} color={theme.palette.font.accent}>
            {t.label.wind} & {t.label.compass}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge label={windDir} color={theme.color.accent.color} size="sm" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto" py={theme.spacing.sm}>
        <Stack spacing={theme.spacing.xxs}>
          <Stack direction="row" alignItems="baseline" spacing={theme.spacing.xxs}>
            <Custom.Typography fontSize={theme.font.xl} fontWeight={theme.font.bold} sx={{ letterSpacing: "-0.03em" }}>
              {windSpeed}
            </Custom.Typography>
            <Custom.Typography fontSize={theme.font.sm} fontWeight={theme.font.medium} color={theme.palette.font.accent}>
              {speedUnit}
            </Custom.Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
            <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
              {t.label.gust}:{" "}
              <Box component="span" sx={{ color: theme.color.status.warning.color, fontWeight: theme.font.semiBold }}>
                {gustSpeed} {speedUnit}
              </Box>
            </Custom.Typography>
          </Stack>
        </Stack>

        {/* 360° Magnetic Compass Needle */}
        <Custom.CompassGauge directionText={windDir} size={78} />
      </Stack>

      {/* Aerodynamic Speed Vector Footer */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt={theme.spacing.xs}
        sx={{ borderTop: `1px solid ${theme.palette.border}` }}
      >
        <Custom.Typography fontSize={theme.font.xxs} color={theme.palette.font.accent}>
          {t.label.sustained}
        </Custom.Typography>
        <Custom.Typography fontSize={theme.font.xxs} fontWeight={theme.font.semiBold} color={theme.color.accent.color}>
          {windDir} at {windSpeed} {speedUnit}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
