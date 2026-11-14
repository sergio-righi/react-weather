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
      spacing={{ xs: 1, sm: 1.5 }}
      sx={{
        width: "100%",
        py: 0.5,
        flexWrap: { xs: "nowrap", sm: "nowrap" },
      }}
    >
      {/* Segmented Pill View Switcher (Day Overview vs 24h Scrubber) */}
      <Box
        sx={{
          display: "inline-flex",
          p: 0.5,
          borderRadius: "9999px",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.04)"
            : "rgba(255, 255, 255, 0.8)",
          border: `1px solid ${theme.palette.border}`,
          backdropFilter: "blur(12px)",
          position: "relative",
          maxWidth: { xs: "240px", sm: "none" },
        }}
      >
        {/* Day Tab */}
        <Box
          onClick={() => handleViewChange(Enums.EnumViewSelection.Day)}
          sx={{
            position: "relative",
            px: { xs: 1.25, sm: 2 },
            py: { xs: 0.5, sm: 0.75 },
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
                boxShadow: `0 0 16px ${theme.color.accent.color}66`,
              }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <Custom.Typography
            fontSize={{ xs: 11, sm: 13 }}
            fontWeight={isDay ? "700" : "500"}
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
            px: { xs: 1.25, sm: 2 },
            py: { xs: 0.5, sm: 0.75 },
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
                boxShadow: `0 0 16px ${theme.color.accent.color}66`,
              }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <Custom.Typography
            fontSize={{ xs: 11, sm: 13 }}
            fontWeight={!isDay ? "700" : "500"}
            color={!isDay ? "#FFFFFF" : theme.palette.font.accent}
            sx={{ position: "relative", zIndex: 2, whiteSpace: "nowrap" }}
          >
            {t.label.forecast_24hours}
          </Custom.Typography>
        </Box>
      </Box>

      {/* Control Buttons: Unit Switcher, Sound Ambience, Theme */}
      <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
        {/* Metric / Imperial Unit Toggle */}
        <Common.NeoIconButton
          size="small"
          onClick={handleMeasurementChange}
          title={isMetric ? "Switch to Imperial (°F, mph)" : "Switch to Metric (°C, km/h)"}
        >
          <Custom.Typography
            fontSize={12}
            fontWeight="700"
            color={theme.color.accent.color}
            sx={{ px: 0.25 }}
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
            <VolumeUpRoundedIcon sx={{ fontSize: 17 }} />
          ) : (
            <VolumeOffRoundedIcon sx={{ fontSize: 17 }} />
          )}
        </Common.NeoIconButton>

        {/* Theme Toggle */}
        <Common.NeoIconButton
          size="small"
          onClick={handleToggleTheme}
          title={isDark ? "Switch to Crystal Light Mode" : "Switch to Obsidian Dark Mode"}
        >
          {isDark ? (
            <LightModeRoundedIcon sx={{ fontSize: 17, color: "#FBBF24" }} />
          ) : (
            <DarkModeRoundedIcon sx={{ fontSize: 17, color: "#0F172A" }} />
          )}
        </Common.NeoIconButton>
      </Stack>
    </Stack>
  );
};
