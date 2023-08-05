import { AlertApi, CurrentApi, ForecastDayApi, LocationApi } from "interfaces";

export interface ForecastApi {
  location: LocationApi;
  current: CurrentApi;
  forecast: {
    forecastday: Array<ForecastDayApi>;
  };
  alerts: Array<AlertApi>;
}