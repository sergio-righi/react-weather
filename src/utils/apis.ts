import axios from 'axios';
import { Type } from 'types';
import { Constants } from 'utils';
import { HString } from "helpers";

/**
 * responsible for creating the instance of axios to connect to the Weather API (Search)
 * api docs: https://www.weatherapi.com/docs/
 */

export const searchWeather = (query: string) => axios.create({
  baseURL: HString.toQueryString(Constants.WEATHER.BASE_URL + Constants.WEATHER.SEARCH_API, { key: Constants.WEATHER.API_KEY, q: query }),
});

/**
 * responsible for creating the instance of axios to connect to the Weather API (Current)
 * api docs: https://www.weatherapi.com/docs/
 */

export const currentWeather = (query: string, airquality: Type.YesNo = "yes") => axios.create({
  baseURL: HString.toQueryString(Constants.WEATHER.BASE_URL + Constants.WEATHER.CURRENT_API, { key: Constants.WEATHER.API_KEY, aqi: airquality, q: query }),
});

/**
 * responsible for creating the instance of axios to connect to the Weather API (Forecast)
 * api docs: https://www.weatherapi.com/docs/
 */

export const forecastWeather = (query: string, days: number, airquality: Type.YesNo = "yes", alert: Type.YesNo = "yes") => axios.create({
  baseURL: HString.toQueryString(Constants.WEATHER.BASE_URL + Constants.WEATHER.FORECAST_API, { key: Constants.WEATHER.API_KEY, days: days, aqi: airquality, alerts: alert, q: query }),
});