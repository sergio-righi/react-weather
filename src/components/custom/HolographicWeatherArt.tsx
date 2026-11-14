import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "contexts";

export type WeatherCategory =
  | "sunny"
  | "partly_cloudy"
  | "cloudy"
  | "rain"
  | "heavy_rain"
  | "thunderstorm"
  | "snow"
  | "snow_storm"
  | "fog"
  | "night"
  | "wind";

export const getWeatherCategory = (
  code?: number,
  text?: string,
  isDay: boolean = true
): WeatherCategory => {
  if (!code) {
    if (!isDay) return "night";
    return "sunny";
  }

  // Thunderstorms
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "thunderstorm";

  // Heavy Rain / Torrential
  if ([1192, 1195, 1243, 1246].includes(code)) return "heavy_rain";

  // Rain / Drizzle / Showers / Sleet
  if (
    [
      1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1198,
      1201, 1204, 1207, 1240, 1249, 1252,
    ].includes(code)
  )
    return "rain";

  // Snow / Ice
  if ([1117, 1222, 1225].includes(code)) return "snow_storm";
  if (
    [
      1066, 1114, 1210, 1213, 1216, 1219, 1237, 1255, 1258, 1261, 1264,
    ].includes(code)
  )
    return "snow";

  // Fog / Mist / Haze
  if ([1030, 1135, 1147].includes(code)) return "fog";

  // Clouds
  if ([1006, 1009].includes(code)) return "cloudy";
  if ([1003].includes(code)) return isDay ? "partly_cloudy" : "night";

  // Sunny / Clear
  if ([1000].includes(code)) {
    return isDay ? "sunny" : "night";
  }

  return isDay ? "sunny" : "night";
};

type Props = {
  category: WeatherCategory;
  size?: number;
};

export const HolographicWeatherArt: React.FC<Props> = ({
  category,
  size = 64,
}) => {
  const { theme } = useTheme();
  const accent = theme.color.accent.color;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="35%" stopColor="#FDE047" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="sunRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#E2E8F0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="darkCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#475569" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="rainDropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Filters */}
          <filter id="neonSunGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glassCloudShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        {/* 1. SUNNY */}
        {category === "sunny" && (
          <g filter="url(#neonSunGlow)">
            {/* Pulsing Sun Rays Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="url(#sunRayGrad)"
              strokeWidth="5"
              strokeDasharray="4 8"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50px", originY: "50px" }}
            />
            {/* Outer Aura Ring */}
            <circle cx="50" cy="50" r="26" fill="#F59E0B" opacity="0.25" />
            {/* Core Solar Plasma Orb */}
            <motion.circle
              cx="50"
              cy="50"
              r="22"
              fill="url(#sunGrad)"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Specular Glint */}
            <circle cx="43" cy="43" r="5" fill="#FFFFFF" opacity="0.6" />
          </g>
        )}

        {/* 2. PARTLY CLOUDY */}
        {category === "partly_cloudy" && (
          <g>
            {/* Sun in Background */}
            <g filter="url(#neonSunGlow)">
              <circle cx="62" cy="38" r="16" fill="url(#sunGrad)" />
              <circle cx="58" cy="34" r="3.5" fill="#FFFFFF" opacity="0.6" />
            </g>
            {/* Frosted Glass Cloud Foreground */}
            <g filter="url(#glassCloudShadow)">
              <path
                d="M32 72h36c6.6 0 12-5.4 12-12 0-5.8-4.1-10.6-9.6-11.8C69.3 40.5 62.4 34 54 34c-7.6 0-14 5.3-15.6 12.5C37.2 46.2 36.1 46 35 46c-7.2 0-13 5.8-13 13 0 7.2 5.8 13 13 13z"
                fill="url(#cloudGrad)"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
              />
            </g>
          </g>
        )}

        {/* 3. CLOUDY */}
        {category === "cloudy" && (
          <g filter="url(#glassCloudShadow)">
            {/* Back Cloud */}
            <path
              d="M44 56h32c5.5 0 10-4.5 10-10 0-4.8-3.4-8.8-8-9.8C77 30 71.3 25 64.3 25c-6.3 0-11.7 4.4-13 10.4C50.3 35.2 49.4 35 48.5 35c-6 0-10.8 4.8-10.8 10.8 0 6 4.8 10.8 10.8 10.8z"
              fill="url(#cloudGrad)"
              opacity="0.65"
            />
            {/* Front Cloud */}
            <motion.path
              d="M30 74h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 40 63.8 33 54.8 33c-8.3 0-15.2 5.8-17 13.6C36.6 46.2 35.3 46 34 46c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="url(#cloudGrad)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              animate={{ x: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* 4. RAIN */}
        {category === "rain" && (
          <g filter="url(#glassCloudShadow)">
            <path
              d="M30 64h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 30 63.8 23 54.8 23c-8.3 0-15.2 5.8-17 13.6C36.6 36.2 35.3 36 34 36c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="url(#cloudGrad)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
            />
            {/* Luminous Raindrops */}
            <motion.line
              x1="36"
              y1="72"
              x2="32"
              y2="84"
              stroke="url(#rainDropGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.line
              x1="52"
              y1="74"
              x2="48"
              y2="88"
              stroke="url(#rainDropGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              animate={{ y: [0, 9, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
            />
            <motion.line
              x1="66"
              y1="72"
              x2="62"
              y2="84"
              stroke="url(#rainDropGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* 5. HEAVY RAIN */}
        {category === "heavy_rain" && (
          <g filter="url(#glassCloudShadow)">
            <path
              d="M30 60h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 26 63.8 19 54.8 19c-8.3 0-15.2 5.8-17 13.6C36.6 32.2 35.3 32 34 32c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="url(#darkCloudGrad)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
            />
            {/* 4 Swift Raindrop Needles */}
            {[28, 42, 56, 70].map((x, i) => (
              <motion.line
                key={x}
                x1={x}
                y1={68}
                x2={x - 6}
                y2={86}
                stroke="#00D2FF"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 4px #00D2FF)" }}
                animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
        )}

        {/* 6. THUNDERSTORM */}
        {category === "thunderstorm" && (
          <g filter="url(#glassCloudShadow)">
            <path
              d="M30 58h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 24 63.8 17 54.8 17c-8.3 0-15.2 5.8-17 13.6C36.6 30.2 35.3 30 34 30c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="url(#darkCloudGrad)"
              stroke="rgba(168,85,247,0.5)"
              strokeWidth="1.5"
            />
            {/* Futuristic Cyan/Purple Lightning Bolt */}
            <motion.polygon
              points="54,56 42,72 50,72 44,92 62,70 52,70"
              fill="url(#lightningGrad)"
              stroke="#FFFFFF"
              strokeWidth="1"
              style={{ filter: "drop-shadow(0 0 8px #00D2FF)" }}
              animate={{ opacity: [1, 0.3, 1, 0.8, 1], scale: [1, 1.05, 0.98, 1.02, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* 7. SNOW */}
        {category === "snow" && (
          <g filter="url(#glassCloudShadow)">
            <path
              d="M30 62h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 28 63.8 21 54.8 21c-8.3 0-15.2 5.8-17 13.6C36.6 34.2 35.3 34 34 34c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="url(#cloudGrad)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
            />
            {/* Crystalline Snowflakes */}
            {[34, 52, 68].map((x, i) => (
              <motion.g
                key={x}
                animate={{ rotate: 360, y: [0, 4, 0] }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ originX: `${x}px`, originY: "78px" }}
              >
                <circle cx={x} cy="78" r="4.5" fill="#E0F2FE" />
                <circle cx={x} cy="78" r="2" fill="#FFFFFF" />
              </motion.g>
            ))}
          </g>
        )}

        {/* 8. SNOW STORM */}
        {category === "snow_storm" && (
          <g filter="url(#glassCloudShadow)">
            <path
              d="M30 58h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 24 63.8 17 54.8 17c-8.3 0-15.2 5.8-17 13.6C36.6 30.2 35.3 30 34 30c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="url(#darkCloudGrad)"
              stroke="rgba(224,242,254,0.6)"
              strokeWidth="1.5"
            />
            <motion.path
              d="M26 72h48M20 80h42M30 88h36"
              stroke="#BAE6FD"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 8"
              animate={{ x: [-8, 8, -8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* 9. FOG / HAZE */}
        {category === "fog" && (
          <g>
            <motion.path
              d="M20 38h60M14 50h72M22 62h56M16 74h68"
              stroke="url(#cloudGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              opacity="0.8"
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* 10. NIGHT / CLEAR SKY */}
        {category === "night" && (
          <g filter="url(#neonSunGlow)">
            {/* Luminous Crescent Moon */}
            <motion.path
              d="M62 26c-13.3 0-24 10.7-24 24 0 10.2 6.4 18.9 15.4 22.3C51.6 72.8 49.8 73 48 73c-15.5 0-28-12.5-28-28 0-14.3 10.7-26 24.5-27.7.9 1.1 1.9 2.2 3 3.1 4 3.5 9.2 5.6 14.5 5.6z"
              fill="url(#moonGrad)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 0 10px rgba(56, 189, 248, 0.5))" }}
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Twin Distant Stars */}
            <circle cx="70" cy="38" r="2.5" fill="#38BDF8" opacity="0.9" />
            <circle cx="78" cy="54" r="1.8" fill="#FFFFFF" opacity="0.8" />
          </g>
        )}

        {/* 11. WIND */}
        {category === "wind" && (
          <g>
            <motion.path
              d="M18 42h44c6 0 10-4 10-9s-4-9-9-9-9 4-9 8M14 54h58c6 0 10 4 10 9s-4 9-9 9-9-4-9-8M22 66h32"
              fill="none"
              stroke={accent}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
              animate={{ strokeDashoffset: [0, 40] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </g>
        )}
      </svg>
    </Box>
  );
};
