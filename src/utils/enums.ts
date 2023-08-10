
enum EnumTheme {
  Light = 1,
  Dark = 2,
}

enum EnumYesNo {
  No = 0,
  Yes = 1
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


enum EnumViewSelection {
  Day = 1,
  Hourly = 2,
}

enum EnumMeasurementSystem {
  Metric = 1,
  Imperial = 2,
}

export {
  EnumTheme,
  EnumYesNo,
  EnumResponse,
  EnumFeedback,
  EnumDayOfWeek,
  EnumViewSelection,
  EnumMeasurementSystem,
}