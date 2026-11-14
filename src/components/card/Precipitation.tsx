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
    : `${isMetric ? day?.totalprecip_mm ?? 0 : day?.totalprecip_in ?? 0} ${
        isMetric ? t.label.liquid.metric : t.label.liquid.imperial
      }`;

  return (
    <Common.GlassCard
      glowColor={theme.color.accent.color}
      sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {isSnow ? (
            <AcUnitRoundedIcon sx={{ color: "#38BDF8", fontSize: 18 }} />
          ) : (
            <WaterDropRoundedIcon sx={{ color: theme.color.accent.color, fontSize: 18 }} />
          )}
          <Custom.Typography fontSize={13} fontWeight="600" color={theme.palette.font.accent}>
            {t.label.precipitation}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge
          label={`${chance}%`}
          color={chance > 40 ? theme.color.accent.color : theme.palette.font.accent}
          size="sm"
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my="auto">
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Custom.Typography fontSize={38} fontWeight="700" sx={{ letterSpacing: "-0.03em" }}>
              {chance}
            </Custom.Typography>
            <Custom.Typography fontSize={18} fontWeight="500" color={theme.palette.font.accent}>
              %
            </Custom.Typography>
          </Stack>
          <Custom.Typography fontSize={12} color={theme.palette.font.accent}>
            {t.label.amount}:{" "}
            <Box component="span" sx={{ color: theme.color.accent.color, fontWeight: "600" }}>
              {amount}
            </Box>
          </Custom.Typography>
        </Stack>

        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark
              ? "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%)"
              : "radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, rgba(15, 23, 42, 0.02) 100%)",
            border: isDark
              ? "1px solid rgba(56, 189, 248, 0.25)"
              : "1px solid rgba(2, 132, 199, 0.2)",
            boxShadow: isDark
              ? "0 4px 20px rgba(6, 182, 212, 0.2)"
              : "0 4px 16px rgba(2, 132, 199, 0.12)",
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
          mt: 2,
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
            background: `linear-gradient(90deg, ${theme.color.accent.color} 0%, #38BDF8 100%)`,
            boxShadow: `0 0 8px ${theme.color.accent.color}`,
            transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </Box>
    </Common.GlassCard>
  );
};
