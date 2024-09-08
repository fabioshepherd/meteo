import wretch from 'wretch';
import {
  cityWeatherSchema,
  CityWeatherType,
  searchCitySchema,
  SearchCityType,
} from '../type/weatherType';

const searchCity = async (city: string): Promise<SearchCityType> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=it&format=json`;
  const response = await wretch(url).get().json();
  return searchCitySchema.parse(response);
};

const getWeather = async (
  latitude: number,
  longitude: number
): Promise<CityWeatherType> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code&timezone=Europe%2FBerlin&forecast_days=1`;

  const response = await wretch(url).get().json();
  return cityWeatherSchema.parse(response);
};

const weatherApi = {
  searchCity,
  getWeather,
};

export default weatherApi;
