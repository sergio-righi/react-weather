import React, { useState, useEffect } from "react";
import { Stack, Box, CircularProgress } from "@mui/material";
import { useApp, useService, useTheme } from "contexts";
import { Custom, Common } from "components";
import { Constants } from "utils";
import { PairValue } from "types";
import { SearchApi } from "interfaces";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";

export const Search: React.FC = () => {
  const { weather } = useService();
  const { setLocations, t } = useApp();
  const { theme } = useTheme();
  const [results, setResults] = useState<Array<SearchApi>>([]);
  const [locating, setLocating] = useState<boolean>(false);

  // Global keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key === "k")) &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[placeholder*="Search"]'
        ) as HTMLInputElement | null;
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: PairValue | null
  ) => {
    if (value) {
      setLocations(value);
    }
  };

  const handleInputChange = async (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value && value.length >= Constants.QUERY_MIN_LENGTH) {
      const searchRes = await weather.search(value);
      if (searchRes && Array.isArray(searchRes)) {
        setResults(searchRes);
      }
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const query = `${pos.coords.latitude},${pos.coords.longitude}`;
        const searchRes = await weather.search(query);
        setLocating(false);
        if (searchRes && searchRes.length > 0) {
          const item = searchRes[0];
          setLocations({
            key: item.id,
            value: `${item.name}, ${item.region ? `${item.region} - ` : ""}${item.country}`,
          });
        }
      },
      () => {
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  return (
    <Stack direction="row" alignItems="center" spacing={theme.spacing.xs} sx={{ width: "100%" }}>
      <Box sx={{ flex: 1 }}>
        <Custom.Autocomplete
          onChange={handleChange}
          onInputChange={handleInputChange}
          placeholder={t.placeholder.search_location}
          items={results.map(
            (item: SearchApi) =>
              ({
                key: item.id,
                value: `${item.name}, ${item.region ? `${item.region} - ` : ""}${item.country}`,
              } as PairValue)
          )}
        />
      </Box>

      {/* 1-Click GPS Auto-Location Button */}
      <Common.NeoIconButton
        onClick={handleGeolocate}
        disabled={locating}
        title={t.label.detect_location}
        sx={{ minWidth: 42, height: 42 }}
      >
        {locating ? (
          <CircularProgress size={18} sx={{ color: theme.color.accent.color }} />
        ) : (
          <MyLocationRoundedIcon sx={{ fontSize: theme.font.sm }} />
        )}
      </Common.NeoIconButton>
    </Stack>
  );
};
