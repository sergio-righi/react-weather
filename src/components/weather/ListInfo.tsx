import React, { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { Common, Custom, Weather } from "components";
import { CurrentApi } from "interfaces";
import { HDate } from "helpers";
import { useApp, useTheme } from "contexts";
import { SoundEngine } from "utils/audio";
import { Enums } from "utils";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

type Props = {
  data: CurrentApi;
  onRefresh: () => void;
};

export const ListInfo: React.FC<Props> = ({ data, onRefresh }) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();
  const [spinning, setSpinning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isDark = theme.id === Enums.EnumTheme.Dark;

  // Real-time telemetry clock synchronization (ticks every 15s)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    SoundEngine.playTactileClick();
    setSpinning(true);
    setCurrentTime(new Date());
    onRefresh();
    setTimeout(() => setSpinning(false), 800);
  };

  const speedUnit = isMetric ? t.label.speed.metric : t.label.speed.imperial;
  const liquidUnit = isMetric ? t.label.liquid.metric : t.label.liquid.imperial;
  const distanceUnit = isMetric ? t.label.distance.metric : t.label.distance.imperial;

  const metrics = [
    {
      glyph: data.is_day ? ("sun" as const) : ("moon" as const),
      label: data.is_day ? t.label.day : t.label.night,
      value: data.condition?.text || "",
    },
    {
      glyph: "thermometer" as const,
      label: t.label.temp,
      customValue: (
        <Weather.FeelsLike
          tempC={data.feelslike_c}
          tempF={data.feelslike_f}
        />
      ),
    },
    {
      glyph: "precipitation" as const,
      label: t.label.precipitation,
      value: `${isMetric ? data.precip_mm : data.precip_in} ${liquidUnit}`,
    },
    {
      glyph: "wind" as const,
      label: t.label.wind,
      value: `${isMetric ? data.wind_kph : data.wind_mph} ${speedUnit}`,
    },
    {
      glyph: "visibility" as const,
      label: t.label.visibility,
      value: `${isMetric ? data.vis_km : data.vis_miles} ${distanceUnit}`,
    },
    {
      glyph: "humidity" as const,
      label: t.label.humidity,
      value: `${data.humidity}%`,
    },
    {
      glyph: "uv" as const,
      label: t.label.uv_index,
      value: `${data.uv}`,
    },
  ];

  return (
    <Stack spacing={1.25} sx={{ width: "100%", mt: 1 }}>
      {metrics.map((m, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.25,
            borderRadius: theme.border.radius,
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.03)"
              : "rgba(255, 255, 255, 0.82)",
            border: `1px solid ${theme.palette.border}`,
            boxShadow: isDark
              ? "none"
              : "0 2px 8px rgba(15, 23, 42, 0.05)",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.06)"
                : "#FFFFFF",
              borderColor: theme.color.accent.color,
              boxShadow: isDark
                ? "none"
                : "0 4px 14px rgba(15, 23, 42, 0.08)",
              transform: "translateX(3px)",
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "9px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(15, 23, 42, 0.05)",
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(15, 23, 42, 0.08)",
                boxShadow: isDark
                  ? "0 2px 8px rgba(0, 0, 0, 0.2)"
                  : "0 2px 6px rgba(15, 23, 42, 0.05)",
              }}
            >
              <Custom.HolographicTelemetryIcon kind={m.glyph} size={20} />
            </Box>
            <Custom.Typography
              fontSize={13}
              fontWeight="500"
              color={theme.palette.font.accent}
            >
              {m.label}
            </Custom.Typography>
          </Stack>

          {m.customValue ? (
            m.customValue
          ) : (
            <Custom.Typography
              fontSize={13}
              fontWeight="600"
              color={theme.palette.font.color}
            >
              {m.value}
            </Custom.Typography>
          )}
        </Box>
      ))}

      {/* Live Telemetry Status & Synchronized Timestamp */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pt={0.5}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: theme.color.status.success.color,
              boxShadow: `0 0 8px ${theme.color.status.success.color}`,
            }}
          />
          <Custom.Typography fontSize={11} fontWeight="500" color={theme.palette.font.accent}>
            {`${t.label.live} • ${HDate.toTimeAmPmString(HDate.toSeconds(currentTime), false)}`}
          </Custom.Typography>
        </Stack>

        <Common.NeoIconButton
          size="small"
          onClick={handleRefresh}
          title={t.label.refresh}
          sx={{
            "& .MuiSvgIcon-root": {
              transition: "transform 0.6s ease",
              transform: spinning ? "rotate(360deg)" : "none",
            },
          }}
        >
          <RefreshRoundedIcon sx={{ fontSize: 18 }} />
        </Common.NeoIconButton>
      </Stack>
    </Stack>
  );
};

