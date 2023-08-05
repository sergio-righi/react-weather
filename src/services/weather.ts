import { WeatherData, IWeatherData } from "data";

export interface IWeatherService {
  today(query: string): Promise<any>
}

export class WeatherService implements IWeatherService {
  weatherData: IWeatherData;

  constructor() {
    this.weatherData = new WeatherData();
  }

  async today(query: string) {
    return await this.weatherData.today(query);
  }
}