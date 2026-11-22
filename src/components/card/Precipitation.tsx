import React from "react";
import { Stack, Box } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Enums } from "utils";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";

type Props = {
  data: ForecastApi;
};

export const Precipitation: React.FC<Props> = ({ data }) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();
  const isDark = theme.id === Enums.EnumTheme.Dark;

  const day = data?.day;
  const isSnow = Boolean(day?.daily_chance_of_snow && day.daily_chance_of_snow > 0);
  const chance = isSnow ? day?.daily_chance_of_snow || 0 : day?.daily_chance_of_rain || 0;
  const amount = isSnow
    ? `${day?.totalsnow_cm ?? 0} ${t.label.length.metric}`
    : `${isMetric ? day?.totalprecip_mm ?? 0 : day?.totalprecip_in ?? 0} ${isMetric ? t.label.liquid.metric : t.label.liquid.imperial
    }`;

  return (
    <Common.GlassCard
      glowColor={theme.color.accent.color}
      sx={{ p: theme.spacing.lg, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={theme.spacing.sm}>
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          {isSnow ? (
            <AcUnitRoundedIcon sx={{ color: theme.palette.font.accent, fontSize: theme.font.sm }} />
          ) : (
            <WaterDropRoundedIcon sx={{ color: theme.color.accent.color, fontSize: theme.font.sm }} />
          )}
          <Custom.Typography fontSize={theme.font.xs} fontWeight={theme.font.semiBold} color={theme.palette.font.accent}>
            {t.label.precipitation}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge
          label={`${chance}%`}
          color={chance > 40 ? theme.color.accent.color : theme.palette.font.accent}
          size="sm"
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto" py={theme.spacing.sm}>
        <Stack spacing={theme.spacing.xxs}>
          <Stack direction="row" alignItems="baseline" spacing={theme.spacing.xxs}>
            <Custom.Typography fontSize={theme.font.xl} fontWeight={theme.font.bold} sx={{ letterSpacing: "-0.03em" }}>
              {chance}
            </Custom.Typography>
            <Custom.Typography fontSize={theme.font.sm} fontWeight={theme.font.medium} color={theme.palette.font.accent}>
              %
            </Custom.Typography>
          </Stack>
          <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
            {t.label.amount}:{" "}
            <Box component="span" sx={{ color: theme.color.accent.color, fontWeight: theme.font.semiBold }}>
              {amount}
            </Box>
          </Custom.Typography>
        </Stack>

        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: theme.border.radius,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDark
              ? "rgba(198, 123, 92, 0.12)"
              : "rgba(181, 101, 29, 0.08)",
            border: isDark
              ? "1px solid rgba(212, 196, 168, 0.2)"
              : "1px solid rgba(139, 69, 19, 0.18)",
            boxShadow: isDark
              ? "0 4px 16px rgba(0, 0, 0, 0.3)"
              : "0 4px 14px rgba(139, 69, 19, 0.08)",
          }}
        >
          <Custom.HolographicTelemetryIcon
            kind={isSnow ? "snow" : "rain"}
            size={36}
          />
        </Box>
      </Stack>

      {/* Probability Progress Bar */}
      <Box
        sx={{
          mt: theme.spacing.md,
          width: "100%",
          height: 5,
          borderRadius: "9999px",
          backgroundColor: theme.palette.input.color,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${Math.min(chance, 100)}%`,
            height: "100%",
            borderRadius: "9999px",
            backgroundColor: theme.color.accent.color,
            transition: "width 0.4s ease-out",
          }}
        />
      </Box>
    </Common.GlassCard>
  );
};
