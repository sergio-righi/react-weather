import { WeatherApi } from "interfaces";

import Current from "assets/data/current.json";
import Forecast from "assets/data/forecast.json";

export const CurrentData = Current as WeatherApi;
export const ForecastData = Forecast as unknown as WeatherApi;