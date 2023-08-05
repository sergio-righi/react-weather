import { WeatherService, IWeatherService } from "./weather";

export interface IProvidedService {
  weather: IWeatherService;
}

export const initializeService = (): IProvidedService => ({
  weather: new WeatherService(),
})