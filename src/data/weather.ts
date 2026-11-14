import { Apis } from "utils";
import { CurrentData, ForecastData, SearchData } from "assets/data";

export interface IWeatherData {
  next(query: string, days: number): Promise<any>;
  search(query: string): Promise<any>;
  today(query: string): Promise<any>;
}

export class WeatherData implements IWeatherData {
  async next(query: string, days: number) {
    try {
      const res = await Apis.forecastWeather(query, days).get("");
      if (res && res.data) return res;
      return { data: ForecastData };
    } catch (err) {
      return { data: ForecastData };
    }
  }

  async search(query: string) {
    try {
      const res = await Apis.searchWeather(query).get("");
      if (res && res.data) return res;
      return { data: SearchData };
    } catch (err) {
      return { data: SearchData };
    }
  }

  async today(query: string) {
    try {
      const res = await Apis.currentWeather(query).get("");
      if (res && res.data) return res;
      return { data: CurrentData };
    } catch (err) {
      return { data: CurrentData };
    }
  }
}
