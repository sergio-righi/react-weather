import React from "react";
import { Box, Stack } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";

type SolarArcProps = {
  sunrise: string;
  sunset: string;
};

export const SolarArc: React.FC<SolarArcProps> = ({ sunrise, sunset }) => {
  const { theme } = useTheme();

  // Helper to parse "06:23 AM" into minutes from midnight
  const parseTimeToMinutes = (timeStr: string): number => {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(" ");
    if (parts.length < 2) return 0;
    const [time, modifier] = parts;
    const [hours, minutes] = time.split(":").map(Number);
    let totalHours = hours;
    if (modifier.toUpperCase() === "PM" && hours !== 12) totalHours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) totalHours = 0;
    return totalHours * 60 + minutes;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const sunriseMinutes = parseTimeToMinutes(sunrise);
  const sunsetMinutes = parseTimeToMinutes(sunset);

  // Calculate day progress between 0 and 1
  let progress = 0;
  const daylightDuration = sunsetMinutes - sunriseMinutes;
  const isDaytime =
    currentMinutes >= sunriseMinutes && currentMinutes <= sunsetMinutes;

  if (daylightDuration > 0) {
    if (currentMinutes < sunriseMinutes) {
      progress = 0;
    } else if (currentMinutes > sunsetMinutes) {
      progress = 1;
    } else {
      progress = (currentMinutes - sunriseMinutes) / daylightDuration;
    }
  }

  // SVG Parabola Coordinates: width = 240, height = 90
  // Arc starts at (20, 80) and ends at (220, 80), peak at (120, 15)
  const startX = 25;
  const endX = 215;
  const baseY = 75;
  const peakY = 15;

  // Normalized x and parabolic y
  const currentX = startX + progress * (endX - startX);
  // Quadratic bezier interpolation: B(t) = (1-t)^2*P0 + 2(1-t)t*P1 + t^2*P2 with control P1=(120, -10)
  const t = progress;
  const currentY =
    (1 - t) * (1 - t) * baseY + 2 * (1 - t) * t * peakY + t * t * baseY;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 260, position: "relative" }}>
        <svg viewBox="0 0 240 90" width="100%" height="90" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="solarArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.3" />
            </linearGradient>
            <filter id="solarGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            </filter>
          </defs>

          {/* Dotted Horizon Base */}
          <line
            x1="15"
            y1={baseY}
            x2="225"
            y2={baseY}
            stroke={theme.palette.border}
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />

          {/* Celestial Parabolic Arc */}
          <path
            d={`M ${startX} ${baseY} Q 120 ${peakY} ${endX} ${baseY}`}
            fill="none"
            stroke="url(#solarArcGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Sun / Moon Orb Indicator */}
          {isDaytime ? (
            <g>
              <circle
                cx={currentX}
                cy={currentY}
                r="10"
                fill="#F59E0B"
                opacity="0.35"
                filter="url(#solarGlow)"
              />
              <circle
                cx={currentX}
                cy={currentY}
                r="6"
                fill="#FBBF24"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          ) : (
            <circle
              cx={progress > 0.5 ? endX : startX}
              cy={baseY}
              r="5"
              fill={theme.palette.font.accent}
              opacity="0.6"
            />
          )}
        </svg>
      </Box>

      {/* Axis timestamps */}
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%", maxWidth: 260, mt: 0.5, px: 1 }}
      >
        <Stack alignItems="flex-start">
          <Custom.Typography fontSize={11} color={theme.palette.font.accent}>
            {sunrise}
          </Custom.Typography>
        </Stack>

        <Stack alignItems="flex-end">
          <Custom.Typography fontSize={11} color={theme.palette.font.accent}>
            {sunset}
          </Custom.Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
