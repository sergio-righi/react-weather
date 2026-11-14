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
      sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FlareRoundedIcon sx={{ color: tierColor, fontSize: 18 }} />
          <Custom.Typography fontSize={13} fontWeight="600" color={theme.palette.font.accent}>
            {t.label.uv_index}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge label={description || t.weather_scale.low} color={tierColor} size="sm" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto">
        <Stack spacing={0.5} sx={{ pr: 1 }}>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Custom.Typography fontSize={38} fontWeight="700" sx={{ letterSpacing: "-0.03em" }}>
              {uv}
            </Custom.Typography>
            <Custom.Typography fontSize={14} fontWeight="600" color={tierColor}>
              / 12+
            </Custom.Typography>
          </Stack>
          <Custom.Typography fontSize={11} color={theme.palette.font.accent} sx={{ maxWidth: 140 }}>
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
        pt={1}
        sx={{ borderTop: `1px solid ${theme.palette.border}` }}
      >
        <Custom.Typography fontSize={11} color={theme.palette.font.accent}>
          {t.label.sun_protection_advisory}
        </Custom.Typography>
        <Custom.Typography fontSize={11} fontWeight="600" color={tierColor}>
          {description}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
