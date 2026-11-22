import React from "react";
import { Stack, Box } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Weather } from "utils";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

type Props = {
  data: ForecastApi;
};

export const Visibility: React.FC<Props> = ({ data }) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();

  const day = data?.day;
  const visKm = day?.avgvis_km ?? 10;
  const visMiles = day?.avgvis_miles ?? 6;
  const value = isMetric ? visKm : visMiles;
  const unit = isMetric ? t.label.distance.metric : t.label.distance.imperial;

  const description = Weather.getVisibilityDescription(visKm, t);
  const isHighVisibility = visKm >= 9;
  const visColor = isHighVisibility
    ? theme.color.status.success.color
    : visKm < 4
      ? theme.color.status.error.color
      : theme.color.status.warning.color;

  return (
    <Common.GlassCard
      glowColor={visColor}
      sx={{ p: theme.spacing.lg, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={theme.spacing.sm}>
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          <VisibilityRoundedIcon sx={{ color: visColor, fontSize: theme.font.sm }} />
          <Custom.Typography fontSize={theme.font.xs} fontWeight={theme.font.semiBold} color={theme.palette.font.accent}>
            {t.label.visibility}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge label={description || t.weather_visibility_scale.good} color={visColor} size="sm" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto" py={theme.spacing.sm}>
        <Stack spacing={theme.spacing.xxs}>
          <Stack direction="row" alignItems="baseline" spacing={theme.spacing.xxs}>
            <Custom.Typography fontSize={theme.font.xl} fontWeight={theme.font.bold} sx={{ letterSpacing: "-0.03em" }}>
              {value}
            </Custom.Typography>
            <Custom.Typography fontSize={theme.font.sm} fontWeight={theme.font.medium} color={theme.palette.font.accent}>
              {unit}
            </Custom.Typography>
          </Stack>
          <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
            {t.label.status}:{" "}
            <Box component="span" sx={{ color: visColor, fontWeight: theme.font.semiBold }}>
              {description}
            </Box>
          </Custom.Typography>
        </Stack>

        {/* Circular Visual Arc */}
        <Custom.RadialGauge
          value={Math.min(visKm, 10)}
          max={10}
          unit={unit}
          color={visColor}
          size={78}
          strokeWidth={7}
        />
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
          Atmospheric Clarity
        </Custom.Typography>
        <Custom.Typography fontSize={theme.font.xxs} fontWeight={theme.font.semiBold} color={visColor}>
          {isHighVisibility ? "Clear Horizon" : "Atmospheric Haze"}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
