import { Apis } from "utils";
import { CurrentData } from "assets/data";

export interface IWeatherData {
  today(query: string): Promise<any>
  next(query: string, days: number): Promise<any>;
}

export class WeatherData implements IWeatherData {

  async today(query: string) {
    try {
      return await Apis.currentWeather(query).get("");
      // return CurrentData.current;
    } catch (err) {
      return null;
    }
  }

  async next(query: string, days: number) {
    try {
      return await Apis.forecastWeather(query, days).get("");
    } catch (err) {
      return null;
    }
  }
}