import React from "react";
import ReactECharts from "echarts-for-react";
import { Stack, Box } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi, HourApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Enums } from "utils";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";

type Props = {
  data: ForecastApi;
};

export const TrendChart: React.FC<Props> = ({ data }) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();
  const isDark = theme.id === Enums.EnumTheme.Dark;

  const hours = data?.hour || [];
  if (hours.length === 0) return null;

  const times = hours.map((h: HourApi) => {
    const d = new Date(h.time);
    return `${d.getHours()}:00`;
  });

  const temps = hours.map((h: HourApi) =>
    isMetric ? Math.round(h.temp_c) : Math.round(h.temp_f)
  );

  const rainChances = hours.map((h: HourApi) =>
    Math.max(h.chance_of_rain || 0, h.chance_of_snow || 0)
  );

  const unit = isMetric ? t.label.temperature.metric : t.label.temperature.imperial;

  const option = {
    backgroundColor: "transparent",
    grid: {
      left: "2%",
      right: "3%",
      top: "14%",
      bottom: "6%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.95)",
      borderColor: theme.color.accent.color,
      borderWidth: 1,
      textStyle: {
        color: isDark ? "#FFFFFF" : "#0F172A",
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const time = params[0]?.name;
        const tempVal = params[0]?.value;
        const rainVal = params[1]?.value;
        return `
          <div style="font-weight: 700; margin-bottom: 4px; color: ${isDark ? "#FFFFFF" : "#0F172A"}">${time}</div>
          <div style="color: ${theme.color.accent.color}; font-weight: 600;">🌡️ ${tempVal}${unit}</div>
          <div style="color: #38BDF8; font-weight: 600;">💧 ${rainVal}% Precip</div>
        `;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: times,
      axisLine: { lineStyle: { color: theme.palette.border } },
      axisTick: { show: false },
      axisLabel: {
        color: theme.palette.font.accent,
        fontSize: 10,
        interval: 3,
      },
    },
    yAxis: [
      {
        type: "value",
        scale: true,
        splitLine: {
          lineStyle: {
            color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.06)",
            type: "dashed",
          },
        },
        axisLabel: {
          color: theme.palette.font.accent,
          formatter: `{value}${unit}`,
          fontSize: 10,
        },
      },
      {
        type: "value",
        max: 100,
        show: false,
      },
    ],
    series: [
      {
        name: "Temperature",
        type: "line",
        smooth: 0.4,
        showSymbol: false,
        symbolSize: 6,
        data: temps,
        lineStyle: {
          width: 3,
          color: theme.color.accent.color,
          shadowColor: `${theme.color.accent.color}80`,
          shadowBlur: 8,
        },
        itemStyle: {
          color: theme.color.accent.color,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${theme.color.accent.color}40` },
              { offset: 1, color: `${theme.color.accent.color}00` },
            ],
          },
        },
      },
      {
        name: "Precipitation",
        type: "bar",
        yAxisIndex: 1,
        barMaxWidth: 6,
        itemStyle: {
          color: isDark ? "rgba(56, 189, 248, 0.45)" : "rgba(14, 165, 233, 0.35)",
          borderRadius: [4, 4, 0, 0],
        },
        data: rainChances,
      },
    ],
  };

  return (
    <Common.GlassCard
      glowColor={theme.color.accent.color}
      sx={{ p: { xs: 2, sm: 2.5 }, width: "100%", height: "100%" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ShowChartRoundedIcon sx={{ color: theme.color.accent.color, fontSize: 18 }} />
          <Custom.Typography fontSize={13} fontWeight="600" color={theme.palette.font.accent}>
            {t.label.trend_chart}
          </Custom.Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Common.LuminousBadge label={`Curve: 24h`} color={theme.color.accent.color} size="sm" />
        </Stack>
      </Stack>

      <Box sx={{ width: "100%", height: { xs: 150, sm: 180 } }}>
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "canvas" }}
        />
      </Box>
    </Common.GlassCard>
  );
};
