import { AlertApi, CurrentApi, ForecastApi, LocationApi } from "interfaces";

export type WeatherApi = {
  location: LocationApi;
  current: CurrentApi;
  forecast: {
    forecastday: Array<ForecastApi>;
  };
  alerts: Array<AlertApi>;
}