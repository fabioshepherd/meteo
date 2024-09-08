import { z } from 'zod';

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  elevation: z.number(),
  feature_code: z.string(),
  country_code: z.string(),
  admin1_id: z.number().optional(),
  admin2_id: z.number().optional(),
  admin3_id: z.number().optional(),
  admin4_id: z.number().optional(),
  timezone: z.string(),
  population: z.number().optional(),
  country_id: z.number().optional(),
  country: z.string().optional(),
  admin1: z.string().optional(),
  admin2: z.string().optional(),
  admin3: z.string().optional(),
  admin4: z.string().optional(),
});

export type CityType = z.infer<typeof citySchema>;

export const searchCitySchema = z.object({
  results: z.array(citySchema).optional(),
  generationtime_ms: z.number(),
});

export type SearchCityType = z.infer<typeof searchCitySchema>;

export const currentUnitsSchema = z.object({
  time: z.string(),
  interval: z.string(),
  temperature_2m: z.string(),
  relative_humidity_2m: z.string(),
  weather_code: z.string(),
  wind_speed_10m: z.string(),
});

export const currentSchema = z.object({
  time: z.string(),
  interval: z.number(),
  temperature_2m: z.number(),
  relative_humidity_2m: z.number(),
  weather_code: z.number(),
  wind_speed_10m: z.number(),
});

export const hourlyUnitsSchema = z.object({
  time: z.string(),
  temperature_2m: z.string(),
});

export const hourlySchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
});

export const dailyUnitsSchema = z.object({
  time: z.string(),
  weather_code: z.string(),
});

export const dailySchema = z.object({
  time: z.array(z.string()),
  weather_code: z.array(z.number()),
});

export const cityWeatherSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_units: currentUnitsSchema,
  current: currentSchema,
  hourly_units: hourlyUnitsSchema,
  hourly: hourlySchema,
  daily_units: dailyUnitsSchema,
  daily: dailySchema,
});

export type CityWeatherType = z.infer<typeof cityWeatherSchema>;
