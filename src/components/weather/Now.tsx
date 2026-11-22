import React, { useEffect, useState, useCallback } from "react";
import { Stack, Box } from "@mui/material";
import { Weather, Custom, Common } from "components";
import { CurrentApi } from "interfaces";
import { HDate } from "helpers";
import { useApp, useService, useTheme } from "contexts";
import { Enums } from "utils";

export const Now: React.FC = () => {
  const { theme } = useTheme();
  const { weather } = useService();
  const { location } = useApp();

  const [dateNow, setDateNow] = useState(new Date());
  const [data, setData] = useState<CurrentApi>({} as CurrentApi);
  const isDark = theme.id === Enums.EnumTheme.Dark;

  // Keep clock updated every minute
  useEffect(() => {
    const timer = setInterval(() => setDateNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefreshClick = useCallback(async () => {
    if (location?.value) {
      const res = await weather.current(location.value);
      if (res) {
        setData(res);
      }
    }
  }, [weather, location]);

  useEffect(() => {
    handleRefreshClick();
  }, [handleRefreshClick]);

  if (!data || !data.condition) {
    return null;
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: { xs: theme.spacing.md, sm: theme.spacing.lg, md: theme.spacing.xl },
        backgroundColor: theme.palette.theme,
        borderRight: { md: `1px solid ${theme.palette.border}` },
        borderBottom: { xs: `1px solid ${theme.palette.border}`, md: "none" },
        transition: "background-color 0.2s ease-out, border-color 0.2s ease-out",
      }}
    >
      {/* Search & Location Bar */}
      <Stack spacing={theme.spacing.sm} mb={theme.spacing.md}>
        <Weather.Search />
        <Weather.Navigation />
      </Stack>

      {/* Hero Temperature & Condition Presentation */}
      <Common.GlassCard
        glowColor={theme.color.accent.color}
        sx={{
          p: { xs: theme.spacing.md, sm: theme.spacing.lg },
          mb: theme.spacing.md,
          backgroundColor: isDark ? "rgba(198, 123, 92, 0.08)" : "#FDFBF7",
          boxShadow: isDark
            ? "none"
            : "0 2px 8px rgba(139, 69, 19, 0.05)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={theme.spacing.md}
        >
          {/* Main Temperature & Day */}
          <Stack spacing={theme.spacing.xxs}>
            <Weather.Temperature
              size="lg"
              tempC={data.temp_c}
              tempF={data.temp_f}
            />
            <Stack direction="row" spacing={theme.spacing.xs} alignItems="center">
              <Custom.Typography fontSize={theme.font.sm} fontWeight={theme.font.bold}>
                {HDate.weekday(dateNow)}
              </Custom.Typography>
              <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
                {HDate.toTimeAmPmString(HDate.toSeconds(dateNow), false)}
              </Custom.Typography>
            </Stack>
          </Stack>

          {/* Condition 2030 Futuristic Holographic Icon */}
          <Box
            sx={{
              width: { xs: 76, sm: 84 },
              height: { xs: 76, sm: 84 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Weather.Icon condition={data.condition} size={84} />
          </Box>
        </Stack>
      </Common.GlassCard>

      {/* Scrollable Micro-Telemetry Metrics */}
      <Box sx={{ flex: 1, overflowY: "auto", pr: theme.spacing.xxs }}>
        <Weather.ListInfo data={data} onRefresh={handleRefreshClick} />
      </Box>
    </Box>
  );
};
