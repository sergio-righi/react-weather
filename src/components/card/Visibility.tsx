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
      sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <VisibilityRoundedIcon sx={{ color: visColor, fontSize: 18 }} />
          <Custom.Typography fontSize={13} fontWeight="600" color={theme.palette.font.accent}>
            {t.label.visibility}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge label={description || t.weather_visibility_scale.good} color={visColor} size="sm" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto">
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Custom.Typography fontSize={38} fontWeight="700" sx={{ letterSpacing: "-0.03em" }}>
              {value}
            </Custom.Typography>
            <Custom.Typography fontSize={16} fontWeight="500" color={theme.palette.font.accent}>
              {unit}
            </Custom.Typography>
          </Stack>
          <Custom.Typography fontSize={12} color={theme.palette.font.accent}>
            {t.label.status}:{" "}
            <Box component="span" sx={{ color: visColor, fontWeight: "600" }}>
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
        pt={1}
        sx={{ borderTop: `1px solid ${theme.palette.border}` }}
      >
        <Custom.Typography fontSize={11} color={theme.palette.font.accent}>
          Atmospheric Clarity
        </Custom.Typography>
        <Custom.Typography fontSize={11} fontWeight="600" color={visColor}>
          {isHighVisibility ? "Clear Horizon" : "Atmospheric Haze"}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
