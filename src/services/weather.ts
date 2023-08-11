import { WeatherData, IWeatherData } from "data";

export interface IWeatherService {
  current(query: string): Promise<any>;
  search(query: string): Promise<any>;
  today(query: string): Promise<any>;
  week(query: string): Promise<any>;
}

export class WeatherService implements IWeatherService {
  weatherData: IWeatherData;

  constructor() {
    this.weatherData = new WeatherData();
  }

  /**
   * get the current weather
   * @param {string} query location string
   * @returns 
   */

  async current(query: string) {
    const response = await this.weatherData.today(query);
    if (response.data) {
      return response.data.current;
    }
  }

  /**
   * get the results according to the search query
   * @param {string} query location string
   * @returns 
   */

  async search(query: string) {
    const response = await this.weatherData.search(query);
    if (response.data) {
      return response.data;
    }
  }

  /**
   * get the today's weather hourly
   * @param {string} query location string
   * @returns 
   */

  async today(query: string) {
    const response = await this.weatherData.next(query, 1);
    if (response.data) {
      return response.data;
    }
  }

  /**
   * get the weather for the next 7 days
   * @param {string} query location string
   * @returns 
   */

  async week(query: string) {
    const response = await this.weatherData.next(query, 7);
    if (response.data) {
      return response.data;
    }
  }
}