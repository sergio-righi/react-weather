import { WeatherApi } from "interfaces";

import CurrentData from "assets/data/current.json";
import ForecastData from "assets/data/forecast.json";

export const Current = CurrentData as WeatherApi;
export const Forecast = ForecastData as unknown as WeatherApi;