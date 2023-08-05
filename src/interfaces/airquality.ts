export interface AirQualityApi {
  co: number; // Carbon Monoxide (μg/m3)
  o3: number; // Ozone (μg/m3)
  no2: number; // Nitrogen dioxide (μg/m3)
  so2: number; // Sulphur dioxide (μg/m3)
  pm2_5: number; // PM2.5 (μg/m3)
  pm10: number; // PM10 (μg/m3)
  "us-epa-index": 1 | 2 | 3 | 4 | 5 | 6;
  "gb-defra-index": 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}