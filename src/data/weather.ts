import { Apis } from "utils";
import { CurrentData, ForecastData, SearchData } from "assets/data";

export interface IWeatherData {
  next(query: string, days: number): Promise<any>;
  search(query: string): Promise<any>;
  today(query: string): Promise<any>
}

export class WeatherData implements IWeatherData {


  async next(query: string, days: number) {
    try {
      // return await Apis.forecastWeather(query, days).get("");
      return ForecastData;
    } catch (err) {
      return null;
    }
  }

  async search(query: string) {
    try {
      // return await Apis.searchWeather(query).get("");
      return SearchData;
    } catch (err) {
      return null;
    }
  }

  async today(query: string) {
    try {
      // return await Apis.currentWeather(query).get("");
      return CurrentData.current;
    } catch (err) {
      return null;
    }
  }
}