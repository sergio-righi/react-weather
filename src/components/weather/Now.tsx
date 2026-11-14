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
        p: { xs: 2, sm: 2.5, md: 3 },
        backdropFilter: "blur(28px) saturate(190%)",
        WebkitBackdropFilter: "blur(28px) saturate(190%)",
        backgroundColor: isDark
          ? "rgba(15, 23, 42, 0.65)"
          : "rgba(255, 255, 255, 0.95)",
        boxShadow: isDark
          ? "4px 0 24px rgba(0, 0, 0, 0.25)"
          : "4px 0 28px rgba(15, 23, 42, 0.08)",
        borderRight: { md: `1px solid ${theme.palette.border}` },
        borderBottom: { xs: `1px solid ${theme.palette.border}`, md: "none" },
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Search & Location Bar */}
      <Stack spacing={1.5} mb={2}>
        <Weather.Search />
        <Weather.Navigation />
      </Stack>

      {/* Hero Temperature & Condition Presentation */}
      <Common.GlassCard
        glowColor={theme.color.accent.color}
        sx={{
          p: { xs: 2, sm: 2.5 },
          mb: 2,
          background: isDark
            ? `linear-gradient(135deg, ${theme.palette.theme} 0%, ${theme.color.accent.color}15 100%)`
            : `linear-gradient(135deg, #FFFFFF 0%, rgba(2, 132, 199, 0.08) 100%)`,
          boxShadow: isDark
            ? "none"
            : "0 4px 20px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {/* Main Temperature & Day */}
          <Stack spacing={0.5}>
            <Weather.Temperature
              size="lg"
              tempC={data.temp_c}
              tempF={data.temp_f}
            />
            <Stack direction="row" spacing={1} alignItems="center">
              <Custom.Typography fontSize={16} fontWeight="700">
                {HDate.weekday(dateNow)}
              </Custom.Typography>
              <Custom.Typography fontSize={13} color={theme.palette.font.accent}>
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
      <Box sx={{ flex: 1, overflowY: "auto", pr: 0.5 }}>
        <Weather.ListInfo data={data} onRefresh={handleRefreshClick} />
      </Box>
    </Box>
  );
};
