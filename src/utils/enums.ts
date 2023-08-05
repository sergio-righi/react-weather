
enum EnumTheme {
  Light = 1,
  Dark = 2,
}

enum EnumFeedback {
  Success = "success",
  Error = "error",
  Info = "info"
}

enum EnumResponse {
  Success = 200,
  Error = 500,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  None = 0,
}

enum EnumDayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

enum EnumAirQuality {
  Low1 = 1,
  Low2 = 2,
  Low3 = 3,
  Moderate1 = 4,
  Moderate2 = 5,
  Moderate3 = 6,
  High1 = 7,
  High2 = 8,
  High3 = 9,
  VeryHigh = 10,
}

export {
  EnumTheme,
  EnumResponse,
  EnumFeedback,
  EnumDayOfWeek,
  EnumAirQuality,
}