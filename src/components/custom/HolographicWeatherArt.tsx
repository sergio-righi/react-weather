import React from "react";
import { Box } from "@mui/material";
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

// Nature Distilled: Earthy, organic materials, terracotta, warm clay, soil, sand & handmade paper warmth
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
      <Box component="svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ overflow: "visible" }}
      >
        {/* 1. SUNNY */}
        {category === "sunny" && (
          <Box component="g">
            <Box component="circle" cx="50" cy="50" r="22" fill="#C67B5C" stroke="#B5651D" strokeWidth="2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <Box component="line"
                key={i}
                x1="50"
                y1="18"
                x2="50"
                y2="23"
                stroke="#B5651D"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </Box>
        )}

        {/* 2. PARTLY CLOUDY */}
        {category === "partly_cloudy" && (
          <Box component="g">
            {/* Sun in Background */}
            <Box component="circle" cx="62" cy="38" r="16" fill="#C67B5C" stroke="#B5651D" strokeWidth="1.5" />
            {/* Linen Cloud Foreground */}
            <Box component="path"
              d="M32 72h36c6.6 0 12-5.4 12-12 0-5.8-4.1-10.6-9.6-11.8C69.3 40.5 62.4 34 54 34c-7.6 0-14 5.3-15.6 12.5C37.2 46.2 36.1 46 35 46c-7.2 0-13 5.8-13 13 0 7.2 5.8 13 13 13z"
              fill="#D4C4A8"
              stroke="#9C8B7A"
              strokeWidth="1.5"
            />
          </Box>
        )}

        {/* 3. CLOUDY */}
        {category === "cloudy" && (
          <Box component="g">
            {/* Back Cloud */}
            <Box component="path"
              d="M44 56h32c5.5 0 10-4.5 10-10 0-4.8-3.4-8.8-8-9.8C77 30 71.3 25 64.3 25c-6.3 0-11.7 4.4-13 10.4C50.3 35.2 49.4 35 48.5 35c-6 0-10.8 4.8-10.8 10.8 0 6 4.8 10.8 10.8 10.8z"
              fill="#B8A793"
              stroke="#9C8B7A"
              strokeWidth="1"
            />
            {/* Front Cloud */}
            <Box component="path"
              d="M30 74h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 40 63.8 33 54.8 33c-8.3 0-15.2 5.8-17 13.6C36.6 46.2 35.3 46 34 46c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="#D4C4A8"
              stroke="#9C8B7A"
              strokeWidth="1.5"
            />
          </Box>
        )}

        {/* 4. RAIN */}
        {category === "rain" && (
          <Box component="g">
            <Box component="path"
              d="M30 64h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 30 63.8 23 54.8 23c-8.3 0-15.2 5.8-17 13.6C36.6 36.2 35.3 36 34 36c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="#D4C4A8"
              stroke="#9C8B7A"
              strokeWidth="1.5"
            />
            {/* Earthy Raindrops */}
            <Box component="line"
              x1="36"
              y1="72"
              x2="32"
              y2="84"
              stroke="#6B7B3C"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Box component="line"
              x1="52"
              y1="74"
              x2="48"
              y2="88"
              stroke="#6B7B3C"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <Box component="line"
              x1="66"
              y1="72"
              x2="62"
              y2="84"
              stroke="#6B7B3C"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </Box>
        )}

        {/* 5. HEAVY RAIN */}
        {category === "heavy_rain" && (
          <Box component="g">
            <Box component="path"
              d="M30 60h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 26 63.8 19 54.8 19c-8.3 0-15.2 5.8-17 13.6C36.6 32.2 35.3 32 34 32c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="#5C4F44"
              stroke="#2E241E"
              strokeWidth="1.5"
            />
            {[28, 42, 56, 70].map((x) => (
              <Box component="line"
                key={x}
                x1={x}
                y1={68}
                x2={x - 6}
                y2={86}
                stroke="#6B7B3C"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </Box>
        )}

        {/* 6. THUNDERSTORM */}
        {category === "thunderstorm" && (
          <Box component="g">
            <Box component="path"
              d="M30 58h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 24 63.8 17 54.8 17c-8.3 0-15.2 5.8-17 13.6C36.6 30.2 35.3 30 34 30c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="#5C4F44"
              stroke="#2E241E"
              strokeWidth="1.5"
            />
            {/* Terracotta/Ochre Lightning Bolt */}
            <Box component="polygon"
              points="54,56 42,72 50,72 44,92 62,70 52,70"
              fill="#B5651D"
              stroke="#8B4513"
              strokeWidth="1"
            />
          </Box>
        )}

        {/* 7. SNOW */}
        {category === "snow" && (
          <Box component="g">
            <path
              d="M30 62h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 28 63.8 21 54.8 21c-8.3 0-15.2 5.8-17 13.6C36.6 34.2 35.3 34 34 34c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="#D4C4A8"
              stroke="#9C8B7A"
              strokeWidth="1.5"
            />
            {[34, 52, 68].map((x) => (
              <Box component="g" key={x}>
                <Box component="circle" cx={x} cy="78" r="4" fill="#FDFBF7" stroke="#9C8B7A" strokeWidth="1" />
              </Box >
            ))}
          </Box >
        )}

        {/* 8. SNOW STORM */}
        {category === "snow_storm" && (
          <Box component="g">
            <Box component="path"
              d="M30 58h40c7.2 0 13-5.8 13-13 0-6.3-4.5-11.5-10.5-12.8C71.3 24 63.8 17 54.8 17c-8.3 0-15.2 5.8-17 13.6C36.6 30.2 35.3 30 34 30c-7.7 0-14 6.3-14 14 0 7.7 6.3 14 14 14z"
              fill="#5C4F44"
              stroke="#2E241E"
              strokeWidth="1.5"
            />
            <Box component="path"
              d="M26 72h48M20 80h42M30 88h36"
              stroke="#D4C4A8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
          </Box>
        )}

        {/* 9. FOG / HAZE */}
        {category === "fog" && (
          <Box component="g">
            <Box component="path"
              d="M20 38h60M14 50h72M22 62h56M16 74h68"
              stroke="#D4C4A8"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </Box>
        )}

        {/* 10. NIGHT / CLEAR SKY */}
        {category === "night" && (
          <Box component="g">
            <Box component="path"
              d="M62 26c-13.3 0-24 10.7-24 24 0 10.2 6.4 18.9 15.4 22.3C51.6 72.8 49.8 73 48 73c-15.5 0-28-12.5-28-28 0-14.3 10.7-26 24.5-27.7.9 1.1 1.9 2.2 3 3.1 4 3.5 9.2 5.6 14.5 5.6z"
              fill="#D4C4A8"
              stroke="#9C8B7A"
              strokeWidth="1.5"
            />
            <Box component="circle" cx="70" cy="38" r="2.5" fill="#B5651D" />
            <Box component="circle" cx="78" cy="54" r="2" fill="#C67B5C" />
          </Box>
        )}

        {/* 11. WIND */}
        {category === "wind" && (
          <Box component="g">
            <Box component="path"
              d="M18 42h44c6 0 10-4 10-9s-4-9-9-9-9 4-9 8M14 54h58c6 0 10 4 10 9s-4 9-9 9-9-4-9-8M22 66h32"
              fill="none"
              stroke={accent}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
