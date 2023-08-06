import { Apis } from "utils";
import { CurrentData } from "assets/data";

export interface IWeatherData {
  today(query: string): Promise<any>
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
}