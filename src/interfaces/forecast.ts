import { AstroApi, DayApi, HourApi } from "interfaces";

export type ForecastApi = {
  date: string;
  date_epoch: number;
  day: DayApi;
  astro: AstroApi;
  hour: Array<HourApi>;
}
