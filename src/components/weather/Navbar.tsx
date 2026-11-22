import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Enums } from "utils";
import { Common, Custom } from "components";
import { SoundEngine } from "utils/audio";
import { motion } from "framer-motion";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

export const Navbar: React.FC = () => {
  const { isDay, isMetric, setMeasurement, setViewSelection, t } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [ambientAudio, setAmbientAudio] = useState(false);

  const isDark = theme.id === Enums.EnumTheme.Dark;

  const handleToggleTheme = () => {
    SoundEngine.playTactileClick();
    toggleTheme();
  };

  const handleMeasurementChange = () => {
    SoundEngine.playTactileClick();
    setMeasurement(
      isMetric
        ? Enums.EnumMeasurementSystem.Imperial
        : Enums.EnumMeasurementSystem.Metric
    );
  };

  const handleViewChange = (view: Enums.EnumViewSelection) => {
    SoundEngine.playTactileClick();
    setViewSelection(view);
  };

  const handleToggleAudio = () => {
    SoundEngine.playTactileClick();
    if (!ambientAudio) {
      SoundEngine.startAtmosphere("clear");
      setAmbientAudio(true);
    } else {
      SoundEngine.stopAtmosphere();
      setAmbientAudio(false);
    }
  };

  return (
    <Stack
      direction={{ xs: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={{ xs: theme.spacing.xs, sm: theme.spacing.sm }}
      sx={{
        width: "100%",
        py: theme.spacing.xxs,
        flexWrap: { xs: "nowrap", sm: "nowrap" },
      }}
    >
      {/* Segmented Pill View Switcher (Day Overview vs 24h Scrubber) */}
      <Box
        sx={{
          display: "inline-flex",
          p: theme.spacing.xxs,
          borderRadius: "9999px",
          backgroundColor: isDark
            ? "rgba(212, 196, 168, 0.08)"
            : "rgba(139, 69, 19, 0.06)",
          border: `1px solid ${theme.palette.border}`,
          position: "relative",
          maxWidth: { xs: "240px", sm: "none" },
        }}
      >
        {/* Day Tab */}
        <Box
          onClick={() => handleViewChange(Enums.EnumViewSelection.Day)}
          sx={{
            position: "relative",
            px: { xs: theme.spacing.sm, sm: theme.spacing.md },
            py: { xs: theme.spacing.xxs, sm: theme.spacing.xs },
            cursor: "pointer",
            zIndex: 1,
            userSelect: "none",
          }}
        >
          {isDay && (
            <motion.div
              layoutId="navPillIndicator"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: theme.color.accent.color,
                borderRadius: "9999px",
              }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <Custom.Typography
            fontSize={{ xs: theme.font.xxs, sm: theme.font.xs }}
            fontWeight={isDay ? theme.font.bold : theme.font.medium}
            color={isDay ? "#FFFFFF" : theme.palette.font.accent}
            sx={{ position: "relative", zIndex: 2, whiteSpace: "nowrap" }}
          >
            {t.label.forecast_7days}
          </Custom.Typography>
        </Box>

        {/* Hourly Tab */}
        <Box
          onClick={() => handleViewChange(Enums.EnumViewSelection.Hourly)}
          sx={{
            position: "relative",
            px: { xs: theme.spacing.sm, sm: theme.spacing.md },
            py: { xs: theme.spacing.xxs, sm: theme.spacing.xs },
            cursor: "pointer",
            zIndex: 1,
            userSelect: "none",
          }}
        >
          {!isDay && (
            <motion.div
              layoutId="navPillIndicator"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: theme.color.accent.color,
                borderRadius: "9999px",
              }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <Custom.Typography
            fontSize={{ xs: theme.font.xxs, sm: theme.font.xs }}
            fontWeight={!isDay ? theme.font.bold : theme.font.medium}
            color={!isDay ? "#FFFFFF" : theme.palette.font.accent}
            sx={{ position: "relative", zIndex: 2, whiteSpace: "nowrap" }}
          >
            {t.label.forecast_24hours}
          </Custom.Typography>
        </Box>
      </Box>

      {/* Control Buttons: Unit Switcher, Sound Ambience, Theme */}
      <Stack direction="row" alignItems="center" spacing={{ xs: theme.spacing.xxs, sm: theme.spacing.xs}}>
        {/* Metric / Imperial Unit Toggle */}
        <Common.NeoIconButton
          size="small"
          onClick={handleMeasurementChange}
          title={isMetric ? "Switch to Imperial (°F, mph)" : "Switch to Metric (°C, km/h)"}
        >
          <Custom.Typography
            fontSize={theme.font.xs}
            fontWeight={theme.font.bold}
            color={theme.color.accent.color}
            sx={{ px: theme.spacing.xxs }}
          >
            {isMetric ? "°C" : "°F"}
          </Custom.Typography>
        </Common.NeoIconButton>

        {/* Ambient Soundscape Toggle */}
        <Common.NeoIconButton
          size="small"
          active={ambientAudio}
          onClick={handleToggleAudio}
          title={ambientAudio ? t.label.sound_ambient_on : t.label.sound_ambient_off}
        >
          {ambientAudio ? (
            <VolumeUpRoundedIcon sx={{ fontSize: theme.font.sm }} />
          ) : (
            <VolumeOffRoundedIcon sx={{ fontSize: theme.font.sm }} />
          )}
        </Common.NeoIconButton>

        {/* Theme Toggle */}
        <Common.NeoIconButton
          size="small"
          onClick={handleToggleTheme}
          title={isDark ? "Switch to Crystal Light Mode" : "Switch to Obsidian Dark Mode"}
        >
          {isDark ? (
            <LightModeRoundedIcon sx={{ fontSize: theme.font.sm, color: theme.color.status.warning.color }} />
          ) : (
            <DarkModeRoundedIcon sx={{ fontSize: theme.font.sm, color: theme.palette.font.color }} />
          )}
        </Common.NeoIconButton>
      </Stack>
    </Stack>
  );
};
