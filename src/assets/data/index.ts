import { SearchApi, WeatherApi } from "interfaces";

import Current from "assets/data/current.json";
import Forecast from "assets/data/forecast.json";
import Search from "assets/data/search.json";

export const CurrentData = Current as WeatherApi;
export const ForecastData = Forecast as unknown as WeatherApi;
export const SearchData = Search as unknown as SearchApi[];