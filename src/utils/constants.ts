import { en } from "assets/locales"

export const REGIONS = {
  EN: "EN"
};

export const LOCALE_STRINGS = {
  [REGIONS.EN]: en
};

export const COUNTRY_CONSTANTS = {
  [REGIONS.EN]: {
    phoneCode: "+1"
  }
};

export const DATE_FORMAT = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
} as any;

export const TIME_FORMAT = {
  hour: "2-digit",
  minute: "2-digit",
} as any;

export const INPUT_MASK = {
  DATE: "9999-99-99",
  PHONE: "(999) 999-9999"
}

export const TEXTAREA = {
  MAX: 5,
  MIN: 3
};

export const PAGE_LENGTH = 10;
export const MAX_INTEGER = 2147483647;
export const MIN_DATE = "1900-01-01";

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

export const LOCATIONS = {
  SANTAMARIA: "santa_maria",
  SAOPAULO: "sao_paulo",
  SINGAPORE: "singapore",
  STOCKHOLM: "stockholm",
  TORONTO: "toronto",
};

export const LOCATIONS_GEO = {
  [LOCATIONS.SANTAMARIA]: "29.6895,53.7923",
  [LOCATIONS.SAOPAULO]: "23.5558,46.6396",
  [LOCATIONS.SINGAPORE]: "1.3521,103.8198",
  [LOCATIONS.STOCKHOLM]: "59.3293,18.0686",
  [LOCATIONS.TORONTO]: "43.717899,-79.6582408",
};

export const WEATHER = {
  API_KEY: String(process.env.REACT_APP_WEATHER_API_KEY),
  BASE_URL: String(process.env.REACT_APP_WEATHER_API_BASE_URL),
  CURRENT_API: "current.json",
  FORECAST_API: "forecast.json",
  SEARCH_API: "search.json"
}