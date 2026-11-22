import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import { PairValue } from "types";
import { Common, Custom } from "components";
import { useApp, useTheme } from "contexts";
import { SoundEngine } from "utils/audio";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  BookmarkBorderRounded,
  BookmarkRemoveRounded,
} from "@mui/icons-material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

export const Navigation: React.FC = () => {
  const { location, locations, setLocation, setLocations } = useApp();
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const isSaved =
    locations.findIndex((item: PairValue) => item.key === location.key) !== -1;
  const locationCount = locations.length;
  const cityTitle = location.value?.split(",")[0] || "Station";
  const regionSubtitle = location.value?.split(",")[1]?.trim() || "";

  const handlePrevClick = () => {
    SoundEngine.playTactileClick();
    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : locationCount - 1;
    setLocation(locations[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const handleNextClick = () => {
    SoundEngine.playTactileClick();
    const nextIndex = currentIndex + 1 > locationCount - 1 ? 0 : currentIndex + 1;
    setLocation(locations[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handleSaveToggle = () => {
    SoundEngine.playTactileClick();
    if (isSaved) {
      setLocations(location.key);
    } else {
      setLocations(location);
    }
  };

  return (
    <Stack spacing={theme.spacing.sm} sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          <Box
            sx={{
              p: theme.spacing.xxs,
              borderRadius: theme.border.circle,
              backgroundColor: `${theme.color.accent.color}20`,
              color: theme.color.accent.color,
              display: "flex",
            }}
          >
            <LocationOnRoundedIcon sx={{ fontSize: theme.font.sm }} />
          </Box>
          <Stack spacing={0}>
            <Custom.Typography fontSize={theme.font.sm} fontWeight={theme.font.bold}>
              {cityTitle}
            </Custom.Typography>
            {regionSubtitle && (
              <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
                {regionSubtitle}
              </Custom.Typography>
            )}
          </Stack>
        </Stack>

        {/* Cycle & Save Actions */}
        <Stack direction="row" spacing={theme.spacing.sm}>
          {locationCount > 1 && (
            <>
              <Common.NeoIconButton size="small" onClick={handlePrevClick}>
                <ArrowBackRounded sx={{ fontSize: theme.font.sm }} />
              </Common.NeoIconButton>
              <Common.NeoIconButton size="small" onClick={handleNextClick}>
                <ArrowForwardRounded sx={{ fontSize: theme.font.sm }} />
              </Common.NeoIconButton>
            </>
          )}

          <Common.NeoIconButton
            size="small"
            active={isSaved}
            onClick={handleSaveToggle}
            title={isSaved ? "Remove from Favorites" : "Pin Station to Favorites"}
          >
            {isSaved ? (
              <BookmarkRemoveRounded sx={{ fontSize: theme.font.sm }} />
            ) : (
              <BookmarkBorderRounded sx={{ fontSize: theme.font.sm }} />
            )}
          </Common.NeoIconButton>
        </Stack>
      </Stack>

      {/* Quick-Access Saved City Chips */}
      {locations.length > 1 && (
        <Stack
          direction="row"
          spacing={theme.spacing.xs}
          sx={{
            overflowX: "auto",
            pb: theme.spacing.xxs,
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {locations.map((loc: PairValue) => {
            const isSelected = loc.key === location.key;
            return (
              <Box
                key={loc.key}
                onClick={() => {
                  SoundEngine.playTactileClick();
                  setLocation(loc);
                }}
                sx={{
                  px: theme.spacing.sm,
                  py: theme.spacing.xxs,
                  borderRadius: "9999px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: isSelected ? theme.font.bold : theme.font.medium,
                  whiteSpace: "nowrap",
                  backgroundColor: isSelected
                    ? `${theme.color.accent.color}25`
                    : "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${
                    isSelected ? theme.color.accent.color : theme.palette.border
                  }`,
                  color: isSelected ? theme.color.accent.color : theme.palette.font.accent,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: theme.color.accent.color,
                    color: theme.palette.font.color,
                  },
                }}
              >
                {loc.value.split(",")[0]}
              </Box>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};
