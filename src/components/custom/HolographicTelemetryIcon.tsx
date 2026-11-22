import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "contexts";
import { Enums } from "utils";

export type TelemetryGlyphKind =
  | "sun"
  | "moon"
  | "thermometer"
  | "precipitation"
  | "wind"
  | "visibility"
  | "humidity"
  | "uv"
  | "rain"
  | "snow";

type Props = {
  kind: TelemetryGlyphKind;
  size?: number;
};

// Nature Distilled: Clean, flat, earthy vector glyphs with zero gradients
export const HolographicTelemetryIcon: React.FC<Props> = ({
  kind,
  size = 28,
}) => {
  const { theme } = useTheme();
  const isDark = theme.id === Enums.EnumTheme.Dark;

  const renderVector = () => {
    switch (kind) {
      case "sun":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            <Box component="circle" cx="16" cy="16" r="6.5" fill="#C67B5C" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <Box component="line"
                key={i}
                x1="16"
                y1="5"
                x2="16"
                y2="7.5"
                stroke="#B5651D"
                strokeWidth="1.8"
                strokeLinecap="round"
                transform={`rotate(${angle} 16 16)`}
              />
            ))}
          </Box>
        );

      case "moon":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            {/* Elegant crescent moon with inner craters */}
            <Box
              component="path"
              d="M21 5.5C14.65 5.5 9.5 10.65 9.5 17C9.5 23.35 14.65 28.5 21 28.5C22.68 28.5 24.28 28.14 25.72 27.5C20.45 26.15 16.5 21.95 16.5 17C16.5 12.05 20.45 7.85 25.72 6.5C24.28 5.86 22.68 5.5 21 5.5Z"
              fill={theme.palette.font.accent}
              stroke={theme.palette.font.color}
              strokeWidth="1.2"
            />
            {/* Subtle lunar crater textures */}
            <Box component="circle" cx="15.5" cy="14" r="1.3" fill={theme.palette.theme} opacity={0.7} />
            <Box component="circle" cx="17.5" cy="19.5" r="1.6" fill={theme.palette.theme} opacity={0.7} />
            <Box component="circle" cx="13.5" cy="20" r="0.9" fill={theme.palette.theme} opacity={0.7} />
          </Box>
        );

      case "thermometer":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            <Box component="rect"
              x="13.5"
              y="6"
              width="5"
              height="16"
              rx="2.5"
              fill={isDark ? "rgba(212, 196, 168, 0.1)" : "rgba(139, 69, 19, 0.08)"}
              stroke={isDark ? "rgba(212, 196, 168, 0.35)" : "rgba(139, 69, 19, 0.3)"}
              strokeWidth="1.2"
            />
            <Box component="circle"
              cx="16"
              cy="23"
              r="4.5"
              fill="#C67B5C"
            />
            <Box component="rect" x="15" y="13" width="2" height="8" rx="1" fill="#C67B5C" />
            <Box component="line" x1="20.5" y1="9" x2="22.5" y2="9" stroke="#8B4513" strokeWidth="1.2" strokeLinecap="round" />
            <Box component="line" x1="20.5" y1="13" x2="22.5" y2="13" stroke="#8B4513" strokeWidth="1.2" strokeLinecap="round" />
          </Box>
        );

      case "precipitation":
      case "rain":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            <Box component="path"
              d="M16 6C16 6 9 15.5 9 19.5C9 23.642 12.134 27 16 27C19.866 27 23 23.642 23 19.5C23 15.5 16 6 16 6Z"
              fill="#6B7B3C"
              stroke="#55632E"
              strokeWidth="1"
            />
          </Box>
        );

      case "snow":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            <Box component="g" stroke="#D4C4A8" strokeWidth="1.8" strokeLinecap="round">
              <Box component="line" x1="16" y1="6" x2="16" y2="26" />
              <Box component="line" x1="7.34" y1="11" x2="24.66" y2="21" />
              <Box component="line" x1="7.34" y1="21" x2="24.66" y2="11" />
              <Box component="path" d="M14 9L16 6L18 9" />
              <Box component="path" d="M14 23L16 26L18 23" />
              <Box component="path" d="M10 12L7.34 11L8.5 14" />
              <Box component="path" d="M22 20L24.66 21L23.5 18" />
            </Box>
          </Box>
        );

      case "wind":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            <Box component="path"
              d="M6 13H21C22.657 13 24 11.657 24 10C24 8.343 22.657 7 21 7C19.5 7 18.25 8.1 18.03 9.5"
              stroke="#C67B5C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Box component="path"
              d="M8 18H23C24.657 18 26 19.343 26 21C26 22.657 24.657 24 23 24C21.4 24 20.1 22.8 20 21.2"
              stroke="#C67B5C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Box component="path"
              d="M5 23H15"
              stroke="#B5651D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Box>
        );

      case "visibility":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            <Box component="path"
              d="M5 16C5 16 9.5 8 16 8C22.5 8 27 16 27 16C27 16 22.5 24 16 24C9.5 24 5 16 5 16Z"
              stroke="#6B7B3C"
              strokeWidth="1.8"
              fill={isDark ? "rgba(107, 123, 60, 0.12)" : "rgba(107, 123, 60, 0.08)"}
            />
            <Box component="circle" cx="16" cy="16" r="3.5" fill="#6B7B3C" />
          </Box>
        );

      case "humidity":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            <Box component="path"
              d="M16 6C16 6 9.5 14.5 9.5 19C9.5 23 12.4 26 16 26C19.6 26 22.5 23 22.5 19C22.5 14.5 16 6 16 6Z"
              stroke="#B5651D"
              strokeWidth="1.6"
              fill={isDark ? "rgba(181, 101, 29, 0.12)" : "rgba(181, 101, 29, 0.08)"}
            />
            <Box component="circle" cx="16" cy="18" r="3" fill="#B5651D" />
          </Box>
        );

      case "uv":
        return (
          <Box component="svg" viewBox="0 0 32 32" width={size} height={size} fill="none">
            <Box component="circle"
              cx="16"
              cy="16"
              r="5.5"
              fill="#C67B5C"
            />
            <Box component="circle"
              cx="16"
              cy="16"
              r="9.5"
              stroke="#C67B5C"
              strokeWidth="1.2"
              strokeDasharray="2 3"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {renderVector()}
    </Box>
  );
};
