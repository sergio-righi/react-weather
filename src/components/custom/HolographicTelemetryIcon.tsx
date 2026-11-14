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

export const HolographicTelemetryIcon: React.FC<Props> = ({
  kind,
  size = 28,
}) => {
  const { theme } = useTheme();
  const isDark = theme.id === Enums.EnumTheme.Dark;
  const accent = theme.color.accent.color;

  const renderVector = () => {
    switch (kind) {
      case "sun":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="sunGlyph" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="60%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#F59E0B" floodOpacity="0.5" />
              </filter>
            </defs>
            <circle cx="16" cy="16" r="6.5" fill="url(#sunGlyph)" filter="url(#sunGlow)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1="16"
                y1="5"
                x2="16"
                y2="7"
                stroke="#F59E0B"
                strokeWidth="1.8"
                strokeLinecap="round"
                transform={`rotate(${angle} 16 16)`}
              />
            ))}
          </svg>
        );

      case "moon":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="moonGlyph" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
            <path
              d="M20 7C14.477 7 10 11.477 10 17C10 22.523 14.477 27 20 27C21.43 27 22.78 26.7 24 26.15C19.5 25 16 20.8 16 17C16 13.2 19.5 9 24 7.85C22.78 7.3 21.43 7 20 7Z"
              fill="url(#moonGlyph)"
              filter="drop-shadow(0 0 3px rgba(56, 189, 248, 0.6))"
            />
            <circle cx="23" cy="9" r="1" fill="#FFFFFF" opacity="0.9" />
            <circle cx="25" cy="14" r="0.8" fill="#38BDF8" opacity="0.8" />
          </svg>
        );

      case "thermometer":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="thermoLiquid" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
            </defs>
            <rect
              x="13.5"
              y="6"
              width="5"
              height="16"
              rx="2.5"
              fill={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)"}
              stroke={isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(15, 23, 42, 0.25)"}
              strokeWidth="1.2"
            />
            <circle
              cx="16"
              cy="23"
              r="4.5"
              fill="url(#thermoLiquid)"
              filter="drop-shadow(0 0 4px rgba(225, 29, 72, 0.6))"
            />
            <rect x="15" y="13" width="2" height="8" rx="1" fill="url(#thermoLiquid)" />
            <line x1="20.5" y1="9" x2="22.5" y2="9" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" />
            <line x1="20.5" y1="13" x2="22.5" y2="13" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );

      case "precipitation":
      case "rain":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="dropGlyph" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
            <path
              d="M16 6C16 6 9 15.5 9 19.5C9 23.642 12.134 27 16 27C19.866 27 23 23.642 23 19.5C23 15.5 16 6 16 6Z"
              fill="url(#dropGlyph)"
              filter="drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))"
            />
            <path
              d="M13.5 17C13.5 15.5 15.5 11 15.5 11"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        );

      case "snow":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="snowGlyph" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
            <g stroke="url(#snowGlyph)" strokeWidth="1.6" strokeLinecap="round" filter="drop-shadow(0 0 3px rgba(56, 189, 248, 0.6))">
              <line x1="16" y1="6" x2="16" y2="26" />
              <line x1="7.34" y1="11" x2="24.66" y2="21" />
              <line x1="7.34" y1="21" x2="24.66" y2="11" />
              <path d="M14 9L16 6L18 9" />
              <path d="M14 23L16 26L18 23" />
              <path d="M10 12L7.34 11L8.5 14" />
              <path d="M22 20L24.66 21L23.5 18" />
            </g>
          </svg>
        );

      case "wind":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="windGlyph" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor={accent} />
              </linearGradient>
            </defs>
            <path
              d="M6 13H21C22.657 13 24 11.657 24 10C24 8.343 22.657 7 21 7C19.5 7 18.25 8.1 18.03 9.5"
              stroke="url(#windGlyph)"
              strokeWidth="1.8"
              strokeLinecap="round"
              filter="drop-shadow(0 0 3px rgba(0, 210, 255, 0.4))"
            />
            <path
              d="M8 18H23C24.657 18 26 19.343 26 21C26 22.657 24.657 24 23 24C21.4 24 20.1 22.8 20 21.2"
              stroke="url(#windGlyph)"
              strokeWidth="1.8"
              strokeLinecap="round"
              filter="drop-shadow(0 0 3px rgba(0, 210, 255, 0.4))"
            />
            <path
              d="M5 23H15"
              stroke="url(#windGlyph)"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        );

      case "visibility":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="eyeGlyph" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <path
              d="M5 16C5 16 9.5 8 16 8C22.5 8 27 16 27 16C27 16 22.5 24 16 24C9.5 24 5 16 5 16Z"
              stroke="url(#eyeGlyph)"
              strokeWidth="1.8"
              fill={isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.08)"}
              filter="drop-shadow(0 0 3px rgba(16, 185, 129, 0.4))"
            />
            <circle cx="16" cy="16" r="3.5" fill="url(#eyeGlyph)" />
            <circle cx="17.2" cy="14.8" r="1" fill="#FFFFFF" />
          </svg>
        );

      case "humidity":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="humidGlyph" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <path
              d="M16 6C16 6 9.5 14.5 9.5 19C9.5 23 12.4 26 16 26C19.6 26 22.5 23 22.5 19C22.5 14.5 16 6 16 6Z"
              stroke="url(#humidGlyph)"
              strokeWidth="1.6"
              fill={isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(56, 189, 248, 0.08)"}
            />
            <path
              d="M16 6C16 6 10 14.5 10 19C10 22.3 12.7 25 16 25V6Z"
              fill="url(#humidGlyph)"
              filter="drop-shadow(0 0 3px rgba(37, 99, 235, 0.4))"
            />
            <circle cx="18" cy="18" r="1.5" fill="#38BDF8" opacity="0.9" />
          </svg>
        );

      case "uv":
        return (
          <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
            <defs>
              <linearGradient id="uvGlyph" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>
            </defs>
            <circle
              cx="16"
              cy="16"
              r="5.5"
              fill="url(#uvGlyph)"
              filter="drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))"
            />
            <circle
              cx="16"
              cy="16"
              r="9.5"
              stroke="url(#uvGlyph)"
              strokeWidth="1.2"
              strokeDasharray="2 3"
              opacity="0.8"
            />
            <circle
              cx="16"
              cy="16"
              r="13"
              stroke="url(#uvGlyph)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </svg>
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
