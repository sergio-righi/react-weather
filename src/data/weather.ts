import { Apis } from "utils";

export interface IWeatherData {
  today(query: string): Promise<any>
}

export class WeatherData implements IWeatherData {

  async today(query: string) {
    try {
      return await Apis.currentWeather(query).get("");
    } catch (err) {
      return null;
    }
  }
}