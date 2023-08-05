import { Type } from "types";

export type WeatherApi = {
  q: string;
  days: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  dt: string;
  end_dt: string
  hour: Type.Hour;
}