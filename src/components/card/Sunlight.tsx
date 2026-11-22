import React from "react";
import { Stack, Box } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";

type Props = {
  data: ForecastApi;
};

export const Sunlight: React.FC<Props> = ({ data }) => {
  const { t } = useApp();
  const { theme } = useTheme();

  const astro = data?.astro;
  const sunrise = astro?.sunrise || "06:00 AM";
  const sunset = astro?.sunset || "06:00 PM";

  // Calculate total daylight hours
  const calculateDaylightHours = (start: string, end: string): string => {
    try {
      const parseTimeToMinutes = (timeStr: string) => {
        const [time, mod] = timeStr.trim().split(" ");
        const [h, m] = time.split(":").map(Number);
        let hours = h;
        if (mod?.toUpperCase() === "PM" && h !== 12) hours += 12;
        if (mod?.toUpperCase() === "AM" && h === 12) hours = 0;
        return hours * 60 + m;
      };
      const diff = parseTimeToMinutes(end) - parseTimeToMinutes(start);
      if (diff > 0) {
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        return `${hours}h ${mins}m`;
      }
    } catch {
      // fallback
    }
    return "12h 00m";
  };

  const daylight = calculateDaylightHours(sunrise, sunset);

  return (
    <Common.GlassCard
      glowColor={theme.color.accent.color}
      sx={{ p: theme.spacing.lg, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={theme.spacing.xs}>
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          <WbSunnyRoundedIcon sx={{ color: theme.color.accent.color, fontSize: theme.font.sm }} />
          <Custom.Typography fontSize={theme.font.xs} fontWeight={theme.font.semiBold} color={theme.palette.font.accent}>
            {t.label.solar_trajectory}
          </Custom.Typography>
        </Stack>
        <Common.LuminousBadge
          label={`${t.label.daylight}: ${daylight}`}
          color={theme.color.status.warning.color}
          size="sm"
        />
      </Stack>

      {/* SVG Solar Arc Celestial Trajectory */}
      <Box sx={{ my: "auto", py: theme.spacing.sm, width: "100%" }}>
        <Custom.SolarArc sunrise={sunrise} sunset={sunset} />
      </Box>

      {/* Astro Golden Hour Footer */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt={theme.spacing.xs}
        sx={{ borderTop: `1px solid ${theme.palette.border}` }}
      >
        <Custom.Typography fontSize={theme.font.xxs} color={theme.palette.font.accent}>
          {t.label.golden_hour}
        </Custom.Typography>
        <Custom.Typography fontSize={theme.font.xxs} fontWeight={theme.font.semiBold} color={theme.color.accent.color}>
          ~1 hr before {sunset}
        </Custom.Typography>
      </Stack>
    </Common.GlassCard>
  );
};
