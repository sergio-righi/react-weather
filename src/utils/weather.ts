import {
  Cloud,
  Cloudy,
  Fog,
  FreezingRain,
  Hail,
  Haze,
  HeavyRain,
  LightRain,
  LightSnow,
  LightningSnow,
  Lightning,
  ModerateRain,
  PartlyCloudy,
  RainCloudDay,
  RainCloud,
  Sleet,
  SnowStorm,
  Snow,
  Stormy,
  Sun,
  TorrentialRain,
} from "assets/images";

export const WEATHER_ICONS: { [key: number]: any } = {
  1000: Sun,
  1003: PartlyCloudy,
  1006: Cloud,
  1009: Cloudy,
  1030: Haze,
  1063: LightRain,
  1066: LightSnow,
  1069: Sleet,
  1072: Hail,
  1087: Lightning,
  1114: Snow,
  1117: SnowStorm,
  1135: Fog,
  1147: Hail,
  1150: FreezingRain,
  1153: FreezingRain,
  1168: Hail,
  1171: Hail,
  1180: RainCloudDay,
  1183: RainCloud,
  1186: ModerateRain,
  1189: ModerateRain,
  1192: HeavyRain,
  1195: HeavyRain,
  1198: Hail,
  1201: Hail,
  1204: Sleet,
  1207: Sleet,
  1210: LightSnow,
  1213: LightSnow,
  1216: Snow,
  1219: Snow,
  1222: SnowStorm,
  1225: SnowStorm,
  1237: Hail,
  1240: LightRain,
  1243: ModerateRain,
  1246: TorrentialRain,
  1249: Sleet,
  1252: Sleet,
  1255: LightSnow,
  1258: Snow,
  1261: Hail,
  1264: Hail,
  1273: Stormy,
  1276: Lightning,
  1279: LightningSnow,
  1282: LightningSnow,
}

export const AIR_QUALITY = {
  GOOD: 3,
  MODERATE: 6,
  UNHEALTHY: 9,
  HAZARDOUS: 10
}

export const UV_INDEX = {
  LOW: 2,
  MODERATE: 5,
  HIGH: 7,
  VERY_HIGH: 10,
  EXTREME: 11
}

export const WEATHER_DEFAULT_LOCATION = { key: 317748, value: 'Toronto, ON - Canada' }

export const getUVIndexDescription = (value: number, t: any) => {
  return value
    ? value <= UV_INDEX.LOW
      ? t.weather_scale.low
      : value <= UV_INDEX.MODERATE
        ? t.weather_scale.moderate
        : value <= UV_INDEX.HIGH
          ? t.weather_scale.high
          : value <= UV_INDEX.VERY_HIGH
            ? t.weather_scale.very_high
            : t.weather_scale.extreme
    : "";
}

export const getHumidityDescription = (value: number, t: any) => {
  return value ? value <= 25 ? t.weather_humidity_level.low : value <= 60 ? t.weather_humidity_level.moderate : t.weather_humidity_level.high : "";
}

export const getVisibilityDescription = (value: number, t: any) => {
  return value ? value <= 2 ? t.weather_visibility_scale.bad : value <= 5 ? t.weather_visibility_scale.good : value <= 10 ? t.weather_visibility_scale.very_good : t.weather_visibility_scale.great : "";
}