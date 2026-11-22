import React from "react";
import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Weather } from "utils";
import FlareRoundedIcon from "@mui/icons-material/FlareRounded";

type Props = {
  data: ForecastApi;
};

export const UVIndex: React.FC<Props> = ({ data }) => {
  const { t } = useApp();
  const { theme } = useTheme();

  const uv = data?.day?.uv ?? 0;
  const description = Weather.getUVIndexDescription(uv, t);

  // Determine tier color and recommendation tip
  let tierColor = theme.color.status.success.color;
  let advisoryTip = t.weather_scale.low_tip;

  if (uv > Weather.UV_INDEX.VERY_HIGH) {
    tierColor = theme.color.status.error.color;
    advisoryTip = t.weather_scale.extreme_tip;
  } else if (uv > Weather.UV_INDEX.HIGH) {
    tierColor = theme.color.status.error.color;
    advisoryTip = t.weather_scale.very_high_tip;
  } else if (uv > Weather.UV_INDEX.MODERATE) {
    tierColor = theme.color.status.warning.color;
    advisoryTip = t.weather_scale.high_tip;
  } else if (uv > Weather.UV_INDEX.LOW) {
    tierColor = theme.color.status.warning.color;
    advisoryTip = t.weather_scale.moderate_tip;
  }

  return (
    <Common.GlassCard
      glowColor={tierColor}
      sx={{ p: theme.spacing.lg, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={theme.spacing.sm}>
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          <FlareRoundedIcon sx={{ color: tierColor, fontSize: theme.font.sm }} />
          <Custom.Typography fontSize={theme.font.xs} fontWeight={theme.font.semiBold} color={theme.palette.font.accent}>
            {t.label.uv_index}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge label={description || t.weather_scale.low} color={tierColor} size="sm" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto" py={theme.spacing.sm}>
        <Stack spacing={theme.spacing.xxs} sx={{ pr: theme.spacing.xs }}>
          <Stack direction="row" alignItems="baseline" spacing={theme.spacing.xxs}>
            <Custom.Typography fontSize={theme.font.xl} fontWeight={theme.font.bold} sx={{ letterSpacing: "-0.03em" }}>
              {uv}
            </Custom.Typography>
            <Custom.Typography fontSize={theme.font.sm} fontWeight={theme.font.semiBold} color={tierColor}>
              / 12+
            </Custom.Typography>
          </Stack>
          <Custom.Typography fontSize={theme.font.xxs} color={theme.palette.font.accent} sx={{ maxWidth: 140 }}>
            {advisoryTip}
          </Custom.Typography>
        </Stack>

        {/* Circular Radial UV Gauge */}
        <Custom.RadialGauge value={uv} max={12} color={tierColor} size={78} strokeWidth={7} />
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
          {t.label.sun_protection_advisory}
        </Custom.Typography>
        <Custom.Typography fontSize={theme.font.xxs} fontWeight={theme.font.semiBold} color={tierColor}>
          {description}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
