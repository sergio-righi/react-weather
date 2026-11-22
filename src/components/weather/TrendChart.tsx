import React from "react";
import ReactECharts from "echarts-for-react";
import { Stack, Box } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi, HourApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";

type Props = {
  data: ForecastApi;
};

export const TrendChart: React.FC<Props> = ({ data }) => {
  const { isMetric, t } = useApp();
  const { theme } = useTheme();

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
      backgroundColor: theme.palette.theme,
      borderColor: theme.palette.border,
      borderWidth: 1,
      textStyle: {
        color: theme.palette.font.color,
        fontFamily: "Inter, sans-serif",
        fontSize: theme.font.xs,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const time = params[0]?.axisValueLabel;
        const tempVal = params[0]?.value;
        const rainVal = params[1]?.value;
        return `
          <div style="font-weight: 700; margin-bottom: 4px; color: ${theme.palette.font.color}">${time}</div>
          <div style="color: ${theme.color.accent.color}; font-weight: 600;">${t.label.temperature}: ${tempVal}${unit}</div>
          <div style="color: ${theme.color.status.success.color}; font-weight: 600;">${t.label.precipitation}: ${rainVal}%</div>
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
        fontSize: theme.font.xxs,
        interval: 3,
      },
    },
    yAxis: [
      {
        type: "value",
        scale: true,
        splitLine: {
          lineStyle: {
            color: theme.palette.border,
            type: "dashed",
          },
        },
        axisLabel: {
          color: theme.palette.font.accent,
          formatter: `{value}${unit}`,
          fontSize: theme.font.xxs,
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
          width: 2.5,
          color: theme.color.accent.color,
        },
        itemStyle: {
          color: theme.color.accent.color,
        },
        areaStyle: {
          color: `${theme.color.accent.color}18`,
        },
      },
      {
        name: "Precipitation",
        type: "bar",
        yAxisIndex: 1,
        barMaxWidth: 6,
        itemStyle: {
          color: theme.color.status.success.color,
          borderRadius: [theme.border.square, theme.border.square, 0, 0],
        },
        data: rainChances,
      },
    ],
  };

  return (
    <Common.GlassCard
      glowColor={theme.color.accent.color}
      sx={{ p: { xs: theme.spacing.md, sm: theme.spacing.lg }, width: "100%", height: "100%" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={theme.spacing.xs}>
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          <ShowChartRoundedIcon sx={{ color: theme.color.accent.color, fontSize: theme.font.sm }} />
          <Custom.Typography fontSize={theme.font.xs} fontWeight={theme.font.semiBold} color={theme.palette.font.accent}>
            {t.label.trend_chart}
          </Custom.Typography>
        </Stack>
        <Stack direction="row" spacing={theme.spacing.xs}>
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
