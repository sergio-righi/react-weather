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
      sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AirRoundedIcon sx={{ color: theme.color.accent.color, fontSize: 18 }} />
          <Custom.Typography fontSize={13} fontWeight="600" color={theme.palette.font.accent}>
            {t.label.wind} & {t.label.compass}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge label={windDir} color={theme.color.accent.color} size="sm" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto">
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Custom.Typography fontSize={38} fontWeight="700" sx={{ letterSpacing: "-0.03em" }}>
              {windSpeed}
            </Custom.Typography>
            <Custom.Typography fontSize={16} fontWeight="500" color={theme.palette.font.accent}>
              {speedUnit}
            </Custom.Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Custom.Typography fontSize={12} color={theme.palette.font.accent}>
              {t.label.gust}:{" "}
              <Box component="span" sx={{ color: theme.color.status.warning.color, fontWeight: "600" }}>
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
        pt={1}
        sx={{ borderTop: `1px solid ${theme.palette.border}` }}
      >
        <Custom.Typography fontSize={11} color={theme.palette.font.accent}>
          {t.label.sustained}
        </Custom.Typography>
        <Custom.Typography fontSize={11} fontWeight="600" color={theme.color.accent.color}>
          {windDir} at {windSpeed} {speedUnit}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
